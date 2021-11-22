import { app } from "./server"
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { loggerError, loggerInfo, loggerWarn } from "./loggers";

declare module 'express-session' {
    export interface SessionData {
        nombre: { [key: string]: any };
    }
}


// const TWITTER_CLIENT_ID = '9g11tHPXHUAPh8M1wXIBdTQiF';
// const TWITTER_CLIENT_SECRET = 'eWusj6Hm4UFbd4ZqhIPk1TKsXOCmDKBdcr4Pmf1F2P8uYrI6KV';

// passport.use(
//     new TwitterStrategy(
//         {
//             consumerKey: TWITTER_CLIENT_ID,
//             consumerSecret: TWITTER_CLIENT_SECRET,
//             callbackURL: '/auth/twitter/callback',
//         },
//         (_token, _tokenSecret, profile, done) => {
//             console.log(profile);

//             return done(
//                 null,
//                 profile,
//             );
//         },
//     ),
// );


const FACEBOOK_CLIENT_ID = process.argv[3] || '858583158050258';
const FACEBOOK_CLIENT_SECRET = process.argv[4] || 'fd7a0238ae2ad8102af47b97f8a22bea';

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'emails'],
    // scope: ['email']
}, function (accessToken: any, refreshToken: any, profile: any, done: any) {

    let userProfile = profile;
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

// const sessionHandler = session({
//     secret: 'secreto',
//     resave: true,
//     saveUninitialized: true,
//   });
  
//   app.use(sessionHandler);

app.use(passport.initialize());
app.use(passport.session());





export const loginAPI = async () => {


    app.get('/login', (req: any, res) => {
        if (req.isAuthenticated()) {
            loggerWarn.warn(req.user.displayName, ' se ha logueado');
            res.render("home", {
                nombre: req.user.displayName,
                img: req.user.photos[0].value,
                // email: req.user.emails[0].value,
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
                loggerWarn.warn(nombre, ' se ha deslogueado');
            })
        } catch (err) {
            res.render("login", {
                title: 'Sign In'
            })
        } finally {
            req.logout();
        }
    })

}