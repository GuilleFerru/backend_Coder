import { Request, Response } from "express";
import { app } from "./server"
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import { dao } from "./main";
import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { usuarioModel as User } from './models/usuarios';
import { Usuario } from "./interfaces/IUsuario";

declare module 'express-session' {
    export interface SessionData {
        nombre: { [key: string]: any };
    }
}

const loginStrategyName = 'login';
const signUpStrategyName = 'signup';

const createHash = (password: any) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const isValidPassword = (user: { password: any; }, password: any) => bcrypt.compareSync(password, user.password);

passport.use(loginStrategyName, new LocalStrategy({
    passReqToCallback: true
},
    (_, username, password, done) => {
        // check in mongo if a user with username exists or not
        User.findOne({ 'username': username },
            (err: any, user: { password: any; }) => {
                // In case of any error, return using the done method
                if (err)
                    return done(err);
                // Username does not exist, log error & redirect back
                if (!user) {
                    console.log('User Not Found with username ' + username);
                    console.log('message', 'User Not found.');
                    return done(null, false)
                }
                // User exists but wrong password, log the error 
                if (!isValidPassword(user, password)) {
                    console.log('Invalid Password');
                    console.log('message', 'Invalid Password');
                    return done(null, false)
                }
                // User and password both match, return user from 
                // done method which will be treated like success
                return done(null, user);
            }
        );
    })
);


passport.use(signUpStrategyName, new LocalStrategy({
    passReqToCallback: true
}, (_, username, password, done) => {
    const findOrCreateUser = () => {
        // find a user in Mongo with provided username
        User.findOne({ 'username': username }, function (err: string, user: any) {
            // In case of any error return
            if (err) {
                console.log('Error in SignUp: ' + err);
                return done(err);
            }
            // already exists
            if (user) {
                console.log('User already exists');
                console.log('message', 'User Already Exists');
                return done(null, false)
            } else {
                // if there is no user with that email
                // create the user
                var newUser: any = new User();
                // set the user's local credentials
                newUser.username = username;
                newUser.password = createHash(password);
                // save the user
                newUser.save(function (err: string) {
                    if (err) {
                        console.log('Error in Saving user: ' + err);
                        throw err;
                    }
                    console.log('User Registration succesful');
                    return done(null, newUser);
                });
            }
        });
    }
    // Delay the execution of findOrCreateUser and execute 
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);
}))

passport.serializeUser(function (user: any, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err: any, user: any) {
        done(err, user);
    });
});


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


export const loginAPI = async () => {

    app.get('/login', (req: any, res) => {
        if (req.isAuthenticated()) {
            res.render("home", {
                nombre: req.user.username
            })
        }
        else {
            res.render("login", {
                formAction: "/login",
                title: 'Sign In',
                btnPrimaryTitle: 'SIGN IN',
                btnSecondaryTitle: 'SIGN UP',
                btnSecondaryAction: '/register'
            })
        }
    })

    app.post('/login', passport.authenticate(loginStrategyName, { failureRedirect: '/faillogin' }), (req, res) => {
        res.redirect('/')
    })

    app.get('/faillogin', (_, res) => {
        res.render('error', {
            btnAction: '/login',
            errorText: 'Compruebe que el Usuario y/o la contraseña sean correctas.'
        });
    })

    app.get('/register', (_, res) => {
        res.render("login", {
            formAction: "/register",
            title: 'Sign Up',
            btnPrimaryTitle: 'SIGN UP',
            btnSecondaryTitle: 'SIGN IN',
            btnSecondaryAction: '/login'
        })
    })

    app.post('/register', passport.authenticate(signUpStrategyName, { failureRedirect: '/failregister' }), (req, res) => {
        res.redirect('/')
    })

    app.get('/failregister', (_, res) => {
        res.render('error', {
            btnAction: '/register',
            errorText: 'El nombre de Usuario que intenta registrar ya ha sido utilizado, por favor seleccione un nombre distinto.'
        });
    })


    app.get('/logout', (req: any, res: any) => {
        let nombre = req.user.username;
        req.logout()
        req.session.destroy(() => {
            console.log('destroy');
        })
        res.render("logout", { nombre })
    })

}