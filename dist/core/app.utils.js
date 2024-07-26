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
exports.AppUtils = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AppUtils {
    static generateHashPassword(pass) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Hash the password
                const hashedPassword = yield bcryptjs_1.default.hash(pass, 10);
                console.log("Hashed Password:", hashedPassword);
                return hashedPassword;
            }
            catch (error) {
                console.error("Error:", error);
                Promise.reject("Error hashing password");
            }
            return Promise.resolve("");
        });
    }
    compareHashPassword(plainTextPassword, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Compare the hashed password with the plain text password
                const isMatch = yield bcryptjs_1.default.compare(plainTextPassword, hashedPassword);
                console.log("Password Match:", isMatch);
                return isMatch;
            }
            catch (error) {
                console.error("Error:", error);
            }
            return false;
        });
    }
}
exports.AppUtils = AppUtils;
