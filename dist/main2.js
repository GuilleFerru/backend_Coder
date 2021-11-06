"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var SocketIO = __importStar(require("socket.io"));
var MongoDbaaSDao_1 = require("./daos/MongoDbaaSDao");
var cluster_1 = __importDefault(require("cluster"));
var os = __importStar(require("os"));
var express_session_1 = __importDefault(require("express-session"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var passport_1 = __importDefault(require("passport"));
var passport_facebook_1 = require("passport-facebook");
var child_process_1 = require("child_process");
var IProducto_1 = require("./interfaces/IProducto");
var productoTest_1 = require("./productoTest");
var IMensaje_1 = require("./interfaces/IMensaje");
var normalizr = __importStar(require("normalizr"));
var modoCluster = process.argv[5] == 'CLUSTER';
if (modoCluster && cluster_1.default.isMaster) {
    var numCPUs = os.cpus().length;
    for (var i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', function (worker, code, signal) {
        console.log("worker " + worker.process.pid + " died");
    });
}
else {
    var app = (0, express_1.default)();
    var port_1 = +process.argv[2] || 8080;
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    var server = app.listen(port_1, function () {
        console.info("Servidor listo en el puerto " + port_1);
    });
    server.on("error", function (error) {
        console.error(error);
    });
    //Configuración de handlebars
    app.engine("hbs", (0, express_handlebars_1.default)({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    }));
    app.set("view engine", "hbs");
    app.set("views", "./views");
    app.use(express_1.default.static('public'));
    var dao_1 = new MongoDbaaSDao_1.MongoDbaaSDao();
    var isAdmin_1 = true;
    var io_1 = new SocketIO.Server(server);
    process.on('exit', function (code) { return console.log("exit " + code); });
    var FACEBOOK_CLIENT_ID = process.argv[3] || '1280074459156595';
    var FACEBOOK_CLIENT_SECRET = process.argv[4] || '27d2001ec573f933251c8d2d61b61434';
    passport_1.default.use(new passport_facebook_1.Strategy({
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        callbackURL: '/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'emails'],
        // scope: ['email']
    }, function (accessToken, refreshToken, profile, done) {
        //console.log(profile)
        var userProfile = profile;
        //console.dir(userProfile, {depth: 4, colors: true})
        return done(null, userProfile);
    }));
    passport_1.default.serializeUser(function (user, done) { return done(null, user); });
    passport_1.default.deserializeUser(function (user, done) { return done(null, user); });
    app.use((0, cookie_parser_1.default)());
    app.use((0, express_session_1.default)({
        store: connect_mongo_1.default.create({
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
            maxAge: 1000 * 600
        }
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.get('/login', function (req, res) {
        if (!req.isAuthenticated()) {
            res.render("home", {
            // nombre: req.user.displayName,
            // img: req.user.photos[0].value,
            // email: req.user.emails[0].value
            });
        }
        else {
            res.render("login", {
                title: 'Sign In'
            });
        }
    });
    app.get('/auth/facebook', passport_1.default.authenticate('facebook'));
    app.get('/auth/facebook/callback', passport_1.default.authenticate('facebook', {
        successRedirect: '/home',
        failureRedirect: '/faillogin'
    }));
    app.get('/home', function (req, res) {
        // console.log(req.user)
        res.redirect('/');
    });
    app.get('/faillogin', function (_, res) {
        res.render('error', {
            btnAction: '/login',
            errorText: 'No se pudo loguear desde su cuenta de Facebook, revise sus credenciales.'
        });
    });
    app.get('/logout', function (req, res) {
        try {
            var nombre = req.user.displayName;
            res.render("logout", { nombre: nombre });
            req.session.destroy(function () {
                console.log('destroy');
            });
        }
        catch (err) {
            res.render("login", {
                title: 'Sign In'
            });
        }
        finally {
            req.logout();
        }
    });
    var argsv = process.argv;
    var args = argsv.splice(2, argsv.length).join(" - ");
    var memoria = Object.entries(process.memoryUsage());
    var memoAux = memoria.map(function (memo) { return memo[0] + ": " + memo[1]; });
    var memoriaString = memoAux.join("  -  ");
    var numCPUs = os.cpus().length;
    var datos_1 = {
        argumentos: args,
        plataforma: process.platform,
        nodeVersion: process.version,
        memoriaUso: memoriaString,
        path: process.argv[1],
        pid: process.pid,
        carpeta: process.cwd(),
        numCPUs: numCPUs
    };
    app.get("/info", function (_, res) {
        return res.render("process", {
            datos: datos_1,
            btnAction: "/home",
            info: true
        });
    });
    var childRandom_1 = (0, child_process_1.fork)("./ts/randomGenerator.ts");
    var callbackReturn = {};
    var sendParent_1 = function (data, callback) {
        childRandom_1.send({ data: data });
        callbackReturn = callback;
    };
    childRandom_1.on('message', function (randoms) {
        callbackReturn(randoms);
    });
    app.get('/randoms', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var cant;
        return __generator(this, function (_a) {
            cant = req.query.cant;
            sendParent_1(cant || 100000000, function (randoms) {
                res.render("process", {
                    randoms: randoms,
                    btnAction: "/home",
                    info: false
                });
            });
            return [2 /*return*/];
        });
    }); });
    var routerProducts = express_1.default.Router();
    app.use("/productos", routerProducts);
    routerProducts.get("/vista-test/", function (req, res) {
        var cant = Number(req.query.cant);
        var cantidadAGenerar = isNaN(cant) ? 10 : cant;
        var fakeProductos = (0, productoTest_1.generateData)(cantidadAGenerar);
        if (fakeProductos.length > 0) {
            res.status(200).json(fakeProductos);
        }
        else {
            res.status(200).json({ error: "no hay productos cargados" });
        }
    });
    var checkIdProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, productoById;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = (req.params.id);
                    return [4 /*yield*/, dao_1.getProductoById(id)];
                case 1:
                    productoById = _a.sent();
                    if (productoById) {
                        if (String(productoById._id) === id) {
                            res.status(200).json(productoById);
                        }
                        else {
                            res.status(404).json({ error: "este producto no esta cargado" });
                        }
                    }
                    else {
                        next();
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    routerProducts.get("/listar/:id?", checkIdProduct, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dao_1.getProductos()];
                case 1:
                    products = _a.sent();
                    if (products.length > 0) {
                        res.status(200).json(products);
                    }
                    else {
                        res.status(404).json({ error: "no hay productos cargados" });
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    routerProducts.post("/agregar", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var newProducto, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!isAdmin_1) return [3 /*break*/, 3];
                    newProducto = new IProducto_1.Producto(req.body.title, req.body.description, req.body.code, req.body.thumbnail, req.body.price, req.body.stock);
                    return [4 /*yield*/, dao_1.insertProducto(newProducto)];
                case 1:
                    _d.sent();
                    _b = (_a = io_1.sockets).emit;
                    _c = ["products"];
                    return [4 /*yield*/, dao_1.getProductos()];
                case 2:
                    _b.apply(_a, _c.concat([_d.sent()]));
                    res.status(200).json({ server: "Producto creado" });
                    return [3 /*break*/, 4];
                case 3:
                    res.status(403).json({
                        error: -1,
                        descripcion: "ruta /productos/agregar metodo POST no autorizado",
                    });
                    _d.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); });
    routerProducts.put("/actualizar/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, newProducto, _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (!isAdmin_1) return [3 /*break*/, 5];
                    id = (req.params.id);
                    newProducto = new IProducto_1.Producto(req.body.title, req.body.description, req.body.code, req.body.thumbnail, req.body.price, req.body.stock);
                    if (!newProducto) return [3 /*break*/, 3];
                    _b = (_a = res.status(200)).json;
                    return [4 /*yield*/, dao_1.updateProducto(id, newProducto)];
                case 1:
                    _b.apply(_a, [_f.sent()]);
                    _d = (_c = io_1.sockets).emit;
                    _e = ["products"];
                    return [4 /*yield*/, dao_1.getProductos()];
                case 2:
                    _d.apply(_c, _e.concat([_f.sent()]));
                    return [3 /*break*/, 4];
                case 3:
                    res.status(404).json({ error: "producto no encontrado" });
                    _f.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    res.status(403).json({
                        error: -1,
                        descripcion: "ruta /productos/actualizar/" + req.params.id + " metodo PUT no autorizado",
                    });
                    _f.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); });
    routerProducts.delete("/borrar/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, productToBeDelete, _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (!isAdmin_1) return [3 /*break*/, 6];
                    id = req.params.id;
                    return [4 /*yield*/, dao_1.getProductoById(id)];
                case 1:
                    productToBeDelete = _f.sent();
                    if (!productToBeDelete) return [3 /*break*/, 4];
                    _b = (_a = res.status(200)).json;
                    return [4 /*yield*/, dao_1.deleteProducto(productToBeDelete._id)];
                case 2:
                    _b.apply(_a, [_f.sent()]);
                    _d = (_c = io_1.sockets).emit;
                    _e = ["products"];
                    return [4 /*yield*/, dao_1.getProductos()];
                case 3:
                    _d.apply(_c, _e.concat([_f.sent()]));
                    return [3 /*break*/, 5];
                case 4:
                    res
                        .status(404)
                        .json({ error: "producto no existente, no se puede borrar" });
                    _f.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    res.status(403).json({
                        error: -1,
                        descripcion: "ruta /productos/borrar/" + req.params.id + " metodo DELETE no autorizado",
                    });
                    _f.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    }); });
    var carritoProducts = express_1.default.Router();
    app.use("/carrito", carritoProducts);
    carritoProducts.post("/agregar/:id_producto", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, productoById, carrrito, cartToBeUpdate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id_producto;
                    return [4 /*yield*/, dao_1.getProductoById(id)];
                case 1:
                    productoById = _a.sent();
                    if (!productoById) return [3 /*break*/, 10];
                    return [4 /*yield*/, dao_1.getCarrito()];
                case 2:
                    carrrito = _a.sent();
                    if (!(carrrito.length > 0)) return [3 /*break*/, 7];
                    cartToBeUpdate = carrrito.find(function (cart) { var _a; return String((_a = cart.producto) === null || _a === void 0 ? void 0 : _a._id) === id; });
                    if (!cartToBeUpdate) return [3 /*break*/, 4];
                    return [4 /*yield*/, dao_1.updateQtyInCarrito(cartToBeUpdate)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, dao_1.insertProductToCarrito(productoById)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, dao_1.insertProductToCarrito(productoById)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    res.status(200).json({ server: "Producto agregado al carrito" });
                    return [3 /*break*/, 11];
                case 10:
                    res.status(404).json({ error: "producto no encontrado" });
                    _a.label = 11;
                case 11: return [2 /*return*/];
            }
        });
    }); });
    var checkIdProductInCarrito = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, carrito;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    return [4 /*yield*/, dao_1.getCarritoById(id)];
                case 1:
                    carrito = _a.sent();
                    if (carrito) {
                        if ((carrito === null || carrito === void 0 ? void 0 : carrito._id) === id) {
                            res.status(200).json(carrito.producto);
                        }
                        else {
                            res.status(404).json({ error: "este producto no esta cargado en el carrito" });
                        }
                    }
                    else {
                        next();
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    carritoProducts.get("/listar/:id?", checkIdProductInCarrito, function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
        var carritos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dao_1.getCarrito()];
                case 1:
                    carritos = _a.sent();
                    res.status(200).json(carritos);
                    return [2 /*return*/];
            }
        });
    }); });
    carritoProducts.post("/agregar", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    order = req.body;
                    return [4 /*yield*/, dao_1.insertOrder(order)
                        // io.sockets.emit("products", await dao.getProductos());
                    ];
                case 1:
                    _a.sent();
                    // io.sockets.emit("products", await dao.getProductos());
                    res.status(200).json({ server: "Compra finalizada" });
                    return [2 /*return*/];
            }
        });
    }); });
    carritoProducts.delete("/borrar/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, cartToBeDelete, _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    id = req.params.id;
                    return [4 /*yield*/, dao_1.getCarritoById(id)];
                case 1:
                    cartToBeDelete = _f.sent();
                    if (!cartToBeDelete) return [3 /*break*/, 4];
                    _b = (_a = res.status(200)).json;
                    return [4 /*yield*/, dao_1.deleteCarrito(cartToBeDelete._id)];
                case 2:
                    _b.apply(_a, [_f.sent()]);
                    _d = (_c = io_1.sockets).emit;
                    _e = ["carts"];
                    return [4 /*yield*/, dao_1.getCarrito()];
                case 3:
                    _d.apply(_c, _e.concat([_f.sent()]));
                    return [3 /*break*/, 5];
                case 4:
                    res.status(404).json({ error: "carrito no existente, no se puede borrar" });
                    _f.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); });
    var getNormalizeMsj_1 = function () { return __awaiter(void 0, void 0, void 0, function () {
        var mensajesOriginal, mensajesOriginalToString, mensajeParse, author, post, chat, normalizePost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dao_1.getMensajes()];
                case 1:
                    mensajesOriginal = _a.sent();
                    mensajesOriginalToString = JSON.stringify(mensajesOriginal);
                    mensajeParse = JSON.parse(mensajesOriginalToString);
                    author = new normalizr.schema.Entity("author", undefined, {
                        idAttribute: 'email',
                    });
                    post = new normalizr.schema.Entity("post", {
                        author: author,
                    });
                    chat = new normalizr.schema.Entity('chat', {
                        authors: [author],
                        posts: [post]
                    });
                    normalizePost = normalizr.normalize(mensajeParse, chat);
                    return [2 /*return*/, normalizePost];
            }
        });
    }); };
    var generateMensajeId_1 = function () {
        return Math.floor(Math.random() * 8 + 1) + Math.random().toString().slice(2, 10);
    };
    io_1.on("connection", function (socket) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _b = (_a = socket).emit;
                    _c = ["messages"];
                    return [4 /*yield*/, getNormalizeMsj_1()];
                case 1:
                    _b.apply(_a, _c.concat([_g.sent()]));
                    socket.emit('port', port_1);
                    socket.on("newMessage", function (mensaje) { return __awaiter(void 0, void 0, void 0, function () {
                        var date, id, checkId, newAuthor, newMensaje, _a, _b, _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    date = new Date().toLocaleString('es-AR');
                                    id = generateMensajeId_1();
                                    checkId = dao_1.getMensajeById(id);
                                    while (checkId) {
                                        id = generateMensajeId_1();
                                    }
                                    newAuthor = new IMensaje_1.Author(mensaje.author.email, mensaje.author.nombre, mensaje.author.apellido, mensaje.author.edad, mensaje.author.alias, mensaje.author.avatar);
                                    newMensaje = new IMensaje_1.Mensaje(id, mensaje.text, date, newAuthor);
                                    return [4 /*yield*/, dao_1.insertMensajes(newMensaje)];
                                case 1:
                                    _d.sent();
                                    _b = (_a = io_1.sockets).emit;
                                    _c = ["messages"];
                                    return [4 /*yield*/, getNormalizeMsj_1()];
                                case 2:
                                    _b.apply(_a, _c.concat([_d.sent()]));
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    _e = (_d = socket).emit;
                    _f = ["products"];
                    return [4 /*yield*/, dao_1.getProductos()];
                case 2:
                    _e.apply(_d, _f.concat([_g.sent(), isAdmin_1]));
                    socket.on("filterProducto", function (filter, filterBy) { return __awaiter(void 0, void 0, void 0, function () {
                        var _a, _b, _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    _b = (_a = socket).emit;
                                    _c = ["products"];
                                    return [4 /*yield*/, dao_1.filterProducto(filter, filterBy)];
                                case 1:
                                    _b.apply(_a, _c.concat([_d.sent(), isAdmin_1]));
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    socket.on("getAllProductos", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a, _b, _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    _b = (_a = socket).emit;
                                    _c = ["products"];
                                    return [4 /*yield*/, dao_1.getProductos()];
                                case 1:
                                    _b.apply(_a, _c.concat([_d.sent()]));
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    }); });
}
