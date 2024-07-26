"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
exports.generateToken = generateToken;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../persistence/entity/user");
const services_1 = __importDefault(require("../service/services"));
const auth_1 = require("../middleware/auth");
function generateToken(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield services_1.default.userService.getUserByUsername(username);
        if (!user) {
            throw new Error('User not found');
        }
        if (user.password !== password) {
            throw new Error('Invalid password');
        }
        const payload = {
            username: user.username,
            authorities: [user.role],
        };
        const token = jsonwebtoken_1.default.sign(payload, auth_1.SECRET_KEY, { expiresIn: auth_1.TOKEN_EXPIRATION });
        // Calculate the expiration time in seconds
        const expires_in = Math.floor(Date.now() / 1000) + (typeof auth_1.TOKEN_EXPIRATION === 'number' ? auth_1.TOKEN_EXPIRATION : 0);
        return { expires_in, access_token: token, token };
    });
}
const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.findOne({ where: { username } });
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    return user;
});
exports.login = login;
