// config.js
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    NODE_TLS_REJECT: process.env.NODE_TLS_REJECT_UNAUTHORIZED || '0',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 8080,
    PERSISTENCIA: process.env.PERSISTENCIA || 1,
    ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_SMS: process.env.TWILIO_SMS_FROM,
    TWILIO_WSP: process.env.TWILIO_WSP_FROM,
    TWILIO_PHONE: process.env.TWILIO_PHONE_NUMBER,
    NODEMAILER_ETHEREAL_USER: process.env.NODEMAILER_ETHEREAL_USER,
    NODEMAILER_ETHEREAL_PASS: process.env.NODEMAILER_ETHEREAL_PASS,
    NODEMAILER_GMAIL_USER: process.env.NODEMAILER_GMAIL_USER,
    NODEMAILER_GMAIL_PASS: process.env.NODEMAILER_GMAIL_PASS,
    MONGO_URL: process.env.MONGO_URL,
    MONGO_URL_LOCAL: process.env.MONGO_URL_LOCAL,
    FIREBASE_URL: process.env.FIREBASE_URL,
    FIREBASE_CREDENTIAL: process.env.FIREBASE_CREDENTIAL,
    FILE_PATH_PRODUCTOS: process.env.FILE_PATH_PRODUCTOS,
    FILE_PATH_CARRITO: process.env.FILE_PATH_CARRITO,
    FILE_PATH_ORDER: process.env.FILE_PATH_ORDER,
    SQL_HOST: process.env.SQL_HOST,
}