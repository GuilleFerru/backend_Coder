// config.js
import { config } from "dotenv";
import { resolve } from "path";

config({
    path: resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const NODE_TLS_REJECT = process.env.NODE_TLS_REJECT_UNAUTHORIZED || '0';
export const HOST = process.env.HOST || '127.0.0.1';
export const PORT = process.env.PORT || 8080;
export const HEROKU = process.env.HEROKU;
export const PERSISTENCIA = process.env.PERSISTENCIA || 1;
export const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
export const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
export const TWILIO_SMS = process.env.TWILIO_SMS_FROM;
export const TWILIO_WSP = process.env.TWILIO_WSP_FROM;
export const TWILIO_PHONE = process.env.TWILIO_PHONE_NUMBER;
export const NODEMAILER_ETHEREAL_USER = process.env.NODEMAILER_ETHEREAL_USER;
export const NODEMAILER_ETHEREAL_PASS = process.env.NODEMAILER_ETHEREAL_PASS;
export const NODEMAILER_GMAIL_USER = process.env.NODEMAILER_GMAIL_USER;
export const NODEMAILER_GMAIL_PASS = process.env.NODEMAILER_GMAIL_PASS;
export const MONGO_URL = process.env.MONGO_URL;
export const MONGO_URL_LOCAL = process.env.MONGO_URL_LOCAL;
export const FIREBASE_URL = process.env.FIREBASE_URL;
export const FIREBASE_CREDENTIAL = process.env.FIREBASE_CREDENTIAL;
export const FILE_PATH_PRODUCTOS = process.env.FILE_PATH_PRODUCTOS;
export const FILE_PATH_CARRITO = process.env.FILE_PATH_CARRITO;
export const FILE_PATH_ORDER = process.env.FILE_PATH_ORDER;
export const SQL_HOST = process.env.SQL_HOST;