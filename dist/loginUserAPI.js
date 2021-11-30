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
exports.loginAPI = exports.newSession = void 0;
var server_1 = require("./server");
var express_session_1 = __importDefault(require("express-session"));
var ISession_1 = require("./interfaces/ISession");
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var passport_1 = __importDefault(require("passport"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var passport_local_1 = require("passport-local");
var usuarios_1 = require("./models/usuarios");
var multer_1 = __importDefault(require("multer"));
var ethereal = __importStar(require("./email/nodemailerEthereal"));
var loggers_1 = require("./loggers");
var loginStrategyName = 'login';
var signUpStrategyName = 'signup';
var createHash = function (password) { return bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(10)); };
var isValidPassword = function (user, password) { return bcrypt_1.default.compareSync(password, user.password); };
passport_1.default.use(loginStrategyName, new passport_local_1.Strategy({
    passReqToCallback: true
}, function (_, username, password, done) {
    // check in mongo if a user with username exists or not
    usuarios_1.usuarioModel.findOne({ 'username': username }, function (err, user) {
        // In case of any error, return using the done method
        if (err) {
            loggers_1.loggerError.info('Error in Login: ' + err);
            return done(err);
        }
        // Username does not exist, log error & redirect back
        if (!user) {
            loggers_1.loggerInfo.info('User Not Found with email ' + username);
            loggers_1.loggerInfo.info('message', 'User Not found.');
            return done(null, false);
        }
        // User exists but wrong password, log the error 
        if (!isValidPassword(user, password)) {
            loggers_1.loggerInfo.info('Invalid Password');
            loggers_1.loggerInfo.info('message', 'Invalid Password');
            return done(null, false);
        }
        // User and password both match, return user from 
        // done method which will be treated like success
        return done(null, user);
    });
}));
passport_1.default.use(signUpStrategyName, new passport_local_1.Strategy({
    passReqToCallback: true
}, function (req, username, password, done) {
    var findOrCreateUser = function () {
        // find a user in Mongo with provided username
        usuarios_1.usuarioModel.findOne({ 'username': username }, function (err, user) {
            var _a;
            // In case of any error return
            if (err) {
                loggers_1.loggerError.info('Error in SignUp: ' + err);
                return done(err);
            }
            // already exists
            if (user) {
                loggers_1.loggerInfo.info('User already exists');
                loggers_1.loggerInfo.info('message', 'User Already Exists');
                return done(null, false);
            }
            else {
                // if there is no user with that email
                // create the user
                var newUser = new usuarios_1.usuarioModel();
                // set the user's local credentials  
                newUser.username = username;
                newUser.name = req.body.name;
                newUser.lastname = req.body.lastname;
                newUser.address = req.body.address;
                newUser.age = req.body.age;
                newUser.phone = req.body.phone;
                newUser.avatar = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path.replace('public', '');
                newUser.password = createHash(password);
                newUser.isAdmin = false;
                // save the user
                newUser.save(function (err) {
                    if (err) {
                        loggers_1.loggerInfo.info('Error in Saving user: ' + err);
                        throw err;
                    }
                    loggers_1.loggerInfo.info('User Registration succesful');
                    var asunto = "nuevo registro";
                    var mensaje = "Se ha creado el siguiente usuario: \n                    Nombre de Usuario: " + newUser.username + ", <br> \n                    Nombre: " + newUser.name + ", <br>\n                    Apellido: " + newUser.lastname + ", <br>\n                    Direcci\u00F3n: " + newUser.address + ", <br>\n                    Edad: " + newUser.age + ", <br>\n                    Telefono: " + newUser.phone + ", <br>\n                    URL del avatar: " + newUser.avatar + ",<br>\n                    Password encriptado: " + newUser.password + ". <br>\n                    Es administrador: " + newUser.isAdmin + ". <br>\n                    ";
                    ethereal.enviarMail(asunto, mensaje, function (err, info) {
                        if (err)
                            loggers_1.loggerError.error(err);
                        else
                            loggers_1.loggerWarn.warn(info);
                    });
                    return done(null, newUser);
                });
            }
        });
    };
    // Delay the execution of findOrCreateUser and execute 
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);
}));
passport_1.default.serializeUser(function (user, done) {
    done(null, user._id);
});
passport_1.default.deserializeUser(function (id, done) {
    usuarios_1.usuarioModel.findById(id, function (err, user) {
        done(err, user);
    });
});
server_1.app.use((0, cookie_parser_1.default)());
server_1.app.use((0, express_session_1.default)({
    store: connect_mongo_1.default.create({
        //En Atlas connect App: Make sure to change the node version to 2.2.12:
        mongoUrl: 'mongodb://ecommerce:3JUOQTzjfNkDKtnh@cluster0-shard-00-00.sl41s.mongodb.net:27017,cluster0-shard-00-01.sl41s.mongodb.net:27017,cluster0-shard-00-02.sl41s.mongodb.net:27017/ecommerce?ssl=true&replicaSet=atlas-o3g8d0-shard-0&authSource=admin&retryWrites=true&w=majority',
        //mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 3600
    }),
    secret: 'secretin',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 1000 * 3600
    }
}));
server_1.app.use(passport_1.default.initialize());
server_1.app.use(passport_1.default.session());
exports.newSession = new ISession_1.Session();
var loginAPI = function () { return __awaiter(void 0, void 0, void 0, function () {
    var upload;
    return __generator(this, function (_a) {
        server_1.app.get('/login', function (req, res) {
            if (req.isAuthenticated()) {
                var user = req.user;
                exports.newSession.setNombre(user.name + " " + user.lastname);
                exports.newSession.setEmail("" + user.username);
                exports.newSession.setPhone("" + user.phone);
                exports.newSession.setIsAdmin(user.isAdmin);
                // req.session.nombre = `${user.name} ${user.lastname} - ${user.username} `;
                // req.session.phone = `${user.phone}`;
                res.render("home", {
                    email: user.username,
                    nombre: user.name,
                    img: user.avatar
                });
            }
            else {
                res.render("login", {
                    enctype: 'application/x-www-form-urlencoded',
                    formAction: "/login",
                    title: 'Sign In',
                    btnPrimaryTitle: 'SIGN IN',
                    btnSecondaryTitle: 'SIGN UP',
                    btnSecondaryAction: '/register'
                });
            }
        });
        server_1.app.post('/login', passport_1.default.authenticate(loginStrategyName, { failureRedirect: '/faillogin' }), function (req, res) {
            res.redirect('/');
        });
        server_1.app.get('/faillogin', function (_, res) {
            res.render('error', {
                btnAction: '/login',
                errorText: 'Compruebe que el Usuario y/o la contraseña sean correctas.'
            });
        });
        server_1.app.get('/register', function (_, res) {
            res.render("login", {
                enctype: 'multipart/form-data',
                signup: true,
                formAction: "/register",
                title: 'Sign Up',
                btnPrimaryTitle: 'SIGN UP',
                btnSecondaryTitle: 'SIGN IN',
                btnSecondaryAction: '/login'
            });
        });
        upload = (0, multer_1.default)({
            storage: multer_1.default.diskStorage({
                destination: function (request, file, callback) {
                    callback(null, "./public/img/userAvatar");
                },
                filename: function (request, file, callback) {
                    callback(null, Date.now() + "-" + file.originalname);
                },
            }),
        });
        server_1.app.post('/register', upload.single("avatar"), passport_1.default.authenticate(signUpStrategyName, { failureRedirect: '/failregister' }), function (req, res) {
            res.redirect('/');
        });
        server_1.app.get('/failregister', function (_, res) {
            res.render('error', {
                btnAction: '/register',
                errorText: 'El nombre de Usuario que intenta registrar ya ha sido utilizado, por favor seleccione un nombre distinto.'
            });
        });
        server_1.app.get('/logout', function (req, res) {
            try {
                var nombre_1 = exports.newSession.getNombre();
                req.logout();
                req.session.destroy(function () {
                    res.render("logout", { nombre: nombre_1 });
                });
            }
            catch (err) {
                res.render("logout", { nombre: '' });
            }
        });
        return [2 /*return*/];
    });
}); };
exports.loginAPI = loginAPI;
