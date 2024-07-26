"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = exports.TOKEN_EXPIRATION = exports.SECRET_KEY = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
exports.SECRET_KEY = process.env.SECRET_KEY || 'somesecret';
exports.TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION;
const verifyAuthToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.split(' ')[1];
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || 'somesecret');
        //  process.env.TOKEN_SECRET || '0123456789010987654321@1200000022'
        console.log('$$$$: ', decodedToken);
        // const id = decodedToken.user;
        // const authorities = decodedToken.authorities
        // res.locals.token = {
        // id
        // };
        next();
        return;
        // return { id, authorities}
    }
    catch (err) {
        res.status(401).json({ message: `Invalid token!` });
    }
};
exports.verifyAuthToken = verifyAuthToken;
