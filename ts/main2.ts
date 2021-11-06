import express, { Request, Response } from "express";

import handlebars from 'express-handlebars'
import * as SocketIO from "socket.io";
import { IDao } from "./interfaces/IDao";
import { productoAPI } from "./productoAPI"
import { carritoAPI } from "./carritoAPI";
import { sockets } from "./sockets";
import { MongoDbaaSDao } from "./daos/MongoDbaaSDao";
import { loginAPI } from "./loginUserAPI";
import { processAPI } from "./processAPI";
import cluster from 'cluster'
import * as os from 'os';
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { fork } from 'child_process';
import { ParsedQs } from "qs";
import { Producto } from "./interfaces/IProducto";
import { generateData } from "./productoTest"
import { isAdmin, io } from "./main"
import { dao } from "./main";
import { Mensaje, Author, MensajeWrap } from "./interfaces/IMensaje";
import * as normalizr from 'normalizr';
import { Cart } from "./interfaces/ICart";



/* SERVER *//////////////////////////////////////////////////////////////////////////////

declare module 'express-session' {
    export interface SessionData {
        nombre: { [key: string]: any };
    }
}

const modoCluster = process.argv[5] == 'CLUSTER'

if (modoCluster && cluster.isMaster) {
    const numCPUs = os.cpus().length;

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    })
} else {

    const app = express();

    const port: number = +process.argv[2] || 8080;
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const server = app.listen(port, () => {
        console.info(`Servidor listo en el puerto ${port}`);
    });

    server.on("error", (error: string) => {
        console.error(error);
    });


    //Configuración de handlebars
    app.engine(
        "hbs",
        handlebars({
            extname: ".hbs",
            defaultLayout: 'index.hbs',
        })
    );
    app.set("view engine", "hbs");
    app.set("views", "./views");


    app.use(express.static('public'))


    const dao: IDao = new MongoDbaaSDao();
    const isAdmin: boolean = true;
    const io = new SocketIO.Server(server);

    process.on(
        'exit',
        (code) => console.log(`exit ${code}`)
        ,
    );

    const FACEBOOK_CLIENT_ID = process.argv[3] || '1280074459156595';
    const FACEBOOK_CLIENT_SECRET = process.argv[4] || '27d2001ec573f933251c8d2d61b61434';

    passport.use(new FacebookStrategy({
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        callbackURL: '/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'emails'],
        // scope: ['email']
    }, function (accessToken: any, refreshToken: any, profile: any, done: any) {
        //console.log(profile)
        let userProfile = profile;
        //console.dir(userProfile, {depth: 4, colors: true})
        return done(null, userProfile);
    }));
    passport.serializeUser((user: any, done) => done(null, user));
    passport.deserializeUser((user: any, done) => done(null, user));

    app.use(cookieParser())
    app.use(session({
        store: MongoStore.create({
            //En Atlas connect App: Make sure to change the node version to 2.2.12:
            mongoUrl: 'mongodb://ecommerce:3JUOQTzjfNkDKtnh@cluster0-shard-00-00.sl41s.mongodb.net:27017,cluster0-shard-00-01.sl41s.mongodb.net:27017,cluster0-shard-00-02.sl41s.mongodb.net:27017/ecommerce?ssl=true&replicaSet=atlas-o3g8d0-shard-0&authSource=admin&retryWrites=true&w=majority',
            //mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
            ttl: 600
        }),
        secret: 'secretin',
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            maxAge: 1_000 * 600
        }
    }));

    app.use(passport.initialize());
    app.use(passport.session());



    app.get('/login', (req: any, res) => {
        if (!req.isAuthenticated()) {
            res.render("home", {
                // nombre: req.user.displayName,
                // img: req.user.photos[0].value,
                // email: req.user.emails[0].value
            })
        }
        else {
            res.render("login", {
                title: 'Sign In'
            })
        }
    })

    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback', passport.authenticate('facebook',
        {
            successRedirect: '/home',
            failureRedirect: '/faillogin'
        }
    ));

    app.get('/home', (req, res) => {
        // console.log(req.user)
        res.redirect('/')
    })

    app.get('/faillogin', (_, res) => {
        res.render('error', {
            btnAction: '/login',
            errorText: 'No se pudo loguear desde su cuenta de Facebook, revise sus credenciales.'
        });
    })

    app.get('/logout', (req: any, res) => {
        try {
            let nombre = req.user.displayName;
            res.render("logout", { nombre })
            req.session.destroy(() => {
                console.log('destroy');
            })
        } catch (err) {
            res.render("login", {
                title: 'Sign In'
            })
        } finally {
            req.logout();
        }
    })

    const argsv: any = process.argv;
    const args = argsv.splice(2, argsv.length).join(" - ");
    const memoria: any = Object.entries(process.memoryUsage());
    const memoAux = memoria.map((memo: any) => `${memo[0]}: ${memo[1]}`);
    const memoriaString = memoAux.join("  -  ");
    const numCPUs = os.cpus().length

    const datos = {
        argumentos: args,
        plataforma: process.platform,
        nodeVersion: process.version,
        memoriaUso: memoriaString,
        path: process.argv[1],
        pid: process.pid,
        carpeta: process.cwd(),
        numCPUs: numCPUs
    };

    app.get("/info", (_, res) =>
        res.render("process", {
            datos,
            btnAction: "/home",
            info: true
        })
    );


    const childRandom = fork("./ts/randomGenerator.ts");
    var callbackReturn: any = {};

    const sendParent = (data: string | number | ParsedQs | string[] | ParsedQs[], callback: (randoms: any) => void) => {
        childRandom.send({ data: data });
        callbackReturn = callback;
    }

    childRandom.on('message', function (randoms: any) {
        callbackReturn(randoms);
    });

    app.get('/randoms', async (req, res) => {
        const { cant } = req.query;
        sendParent(cant || 100000000, randoms => {
            res.render("process", {
                randoms: randoms,
                btnAction: "/home",
                info: false
            })
        });
    });



    const routerProducts = express.Router();
    app.use("/productos", routerProducts);

    routerProducts.get("/vista-test/", (req: Request, res: Response) => {
        const cant = Number(req.query.cant);
        const cantidadAGenerar = isNaN(cant) ? 10 : cant;
        const fakeProductos = generateData(cantidadAGenerar);
        if (fakeProductos.length > 0) {
            res.status(200).json(fakeProductos);
        } else {
            res.status(200).json({ error: "no hay productos cargados" });
        }
    }
    );

    const checkIdProduct = async (req: Request, res: Response, next: () => void) => {
        const id: string = (req.params.id);
        const productoById: Producto | undefined = await dao.getProductoById(id);

        if (productoById) {

            if (String(productoById._id) === id) {

                res.status(200).json(productoById);
            } else {
                res.status(404).json({ error: "este producto no esta cargado" });
            }
        } else {
            next();
        }
    };

    routerProducts.get("/listar/:id?", checkIdProduct, async (req: Request, res: Response) => {
        const products = await dao.getProductos();
        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ error: "no hay productos cargados" });
        }
    }
    );

    routerProducts.post("/agregar", async (req: Request, res: Response) => {
        if (isAdmin) {
            const newProducto: Producto = new Producto(
                req.body.title,
                req.body.description,
                req.body.code,
                req.body.thumbnail,
                req.body.price,
                req.body.stock
            );
            await dao.insertProducto(newProducto)
            io.sockets.emit("products", await dao.getProductos());
            res.status(200).json({ server: "Producto creado" });
        } else {
            res.status(403).json({
                error: -1,
                descripcion: "ruta /productos/agregar metodo POST no autorizado",
            });
        }
    });

    routerProducts.put("/actualizar/:id", async (req: Request, res: Response) => {
        if (isAdmin) {
            const id: string = (req.params.id);
            const newProducto: Producto = new Producto(
                req.body.title,
                req.body.description,
                req.body.code,
                req.body.thumbnail,
                req.body.price,
                req.body.stock
            );
            if (newProducto) {
                res.status(200).json(await dao.updateProducto(id, newProducto));
                io.sockets.emit("products", await dao.getProductos());
            } else {
                res.status(404).json({ error: "producto no encontrado" });
            }
        } else {
            res.status(403).json({
                error: -1,
                descripcion: `ruta /productos/actualizar/${req.params.id} metodo PUT no autorizado`,
            });
        }
    });

    routerProducts.delete("/borrar/:id", async (req: Request, res: Response) => {
        if (isAdmin) {
            const id: string = req.params.id;
            const productToBeDelete: Producto | undefined = await dao.getProductoById(id);
            if (productToBeDelete) {
                res.status(200).json(await dao.deleteProducto(productToBeDelete._id));
                io.sockets.emit("products", await dao.getProductos());
            } else {
                res
                    .status(404)
                    .json({ error: "producto no existente, no se puede borrar" });
            }
        } else {
            res.status(403).json({
                error: -1,
                descripcion: `ruta /productos/borrar/${req.params.id} metodo DELETE no autorizado`,
            });
        }
    });




    const carritoProducts = express.Router();
    app.use("/carrito", carritoProducts);

    carritoProducts.post("/agregar/:id_producto", async (req: Request, res: Response) => {
        const id: string = req.params.id_producto;
        const productoById: Producto | undefined = await dao.getProductoById(id);
        if (productoById) {
            const carrrito = await dao.getCarrito();
            if (carrrito.length > 0) {
                const cartToBeUpdate = carrrito.find((cart) => String(cart.producto?._id) === id);
                if (cartToBeUpdate) {
                    await dao.updateQtyInCarrito(cartToBeUpdate);
                } else {
                    await dao.insertProductToCarrito(productoById);
                }
            } else {
                await dao.insertProductToCarrito(productoById);
            }
            res.status(200).json({ server: "Producto agregado al carrito" });
        } else {
            res.status(404).json({ error: "producto no encontrado" });
        }


    });

    const checkIdProductInCarrito = async (req: Request, res: Response, next: () => void) => {
        const id: string = req.params.id;
        const carrito = await dao.getCarritoById(id);
        if (carrito) {
            if (carrito?._id === id) {
                res.status(200).json(carrito.producto);
            } else {
                res.status(404).json({ error: "este producto no esta cargado en el carrito" });
            }
        } else {
            next();
        }
    };

    carritoProducts.get("/listar/:id?", checkIdProductInCarrito, async (_: Request, res: Response) => {
        const carritos = await dao.getCarrito();
        res.status(200).json(carritos);
    }
    );

    carritoProducts.post("/agregar", async (req: Request, res: Response) => {
        const order: Array<Cart> = req.body;
        await dao.insertOrder(order)
        // io.sockets.emit("products", await dao.getProductos());
        res.status(200).json({ server: "Compra finalizada" });
    });

    carritoProducts.delete("/borrar/:id", async (req: Request, res: Response) => {
        const id: string = req.params.id;
        const cartToBeDelete = await dao.getCarritoById(id);
        if (cartToBeDelete) {
            res.status(200).json(await dao.deleteCarrito(cartToBeDelete._id));
            io.sockets.emit("carts", await dao.getCarrito());
        } else {
            res.status(404).json({ error: "carrito no existente, no se puede borrar" });
        }
    });



    const getNormalizeMsj = async () => {

        const mensajesOriginal: MensajeWrap = await dao.getMensajes();
        const mensajesOriginalToString = JSON.stringify(mensajesOriginal);
        const mensajeParse = JSON.parse(mensajesOriginalToString)

        const author = new normalizr.schema.Entity("author",
            undefined,
            {
                idAttribute: 'email',
            }
        );
        const post = new normalizr.schema.Entity("post", {
            author: author,

        });
        const chat = new normalizr.schema.Entity('chat', {
            authors: [author],
            posts: [post]
        })
        const normalizePost = normalizr.normalize(mensajeParse, chat);
        return normalizePost;
    }

    const generateMensajeId = () => {
        return Math.floor(Math.random() * 8 + 1) + Math.random().toString().slice(2, 10);
    }

    io.on("connection", async (socket) => {

        socket.emit("messages", await getNormalizeMsj());

        socket.emit('port', port)

        socket.on("newMessage", async (mensaje: Mensaje) => {

            const date = new Date().toLocaleString('es-AR');
            let id = generateMensajeId();
            const checkId = dao.getMensajeById(id);
            while (checkId) {
                id = generateMensajeId();
            }
            const newAuthor: Author = new Author(
                mensaje.author.email,
                mensaje.author.nombre,
                mensaje.author.apellido,
                mensaje.author.edad,
                mensaje.author.alias,
                mensaje.author.avatar,
            )
            const newMensaje: Mensaje = new Mensaje(
                id,
                mensaje.text,
                date,
                newAuthor,
            )
            await dao.insertMensajes(newMensaje);

            io.sockets.emit("messages", await getNormalizeMsj());
        });

        socket.emit("products", await dao.getProductos(), isAdmin);

        socket.on("filterProducto", async (filter: string[], filterBy: string) => {
            socket.emit("products", await dao.filterProducto(filter, filterBy), isAdmin);
        });

        socket.on("getAllProductos", async () => {
            socket.emit("products", await dao.getProductos());
        });

    });


}