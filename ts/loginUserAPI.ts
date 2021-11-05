import { app } from "./server"
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook'

declare module 'express-session' {
    export interface SessionData {
        nombre: { [key: string]: any };
    }
}

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


export const loginAPI = async () => {


    app.get('/login', (req: any, res) => {
        if (req.isAuthenticated()) {
            res.render("home", {
                nombre: req.user.displayName,
                img: req.user.photos[0].value,
                email: req.user.emails[0].value
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

}