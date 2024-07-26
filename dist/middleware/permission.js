"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermission = exports.authRole = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// export type AppRole = 'admin' | 'user'; // Adjust based on your roles
const authRole = (permissions) => {
    return (req, res, next) => {
        console.log('req: ', req.headers);
        const userRole = req.body.AppRole;
        if (!userRole) {
            return res.status(401).json('Access denied');
        }
        // Ensure permissions is an array for consistent handling
        const permissionsArray = Array.isArray(permissions) ? permissions : [permissions];
        if (permissions.includes(userRole.toString())) {
            next();
        }
        else {
            return res.status(401).json('You dont have permission');
        }
    };
};
exports.authRole = authRole;
const checkPermission = (authority) => {
    return (req, res, next) => {
        var _a;
        const authorisation = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        const accessToken = authorisation === null || authorisation === void 0 ? void 0 : authorisation.split(" ")[1];
        if (accessToken) {
            const decode = jsonwebtoken_1.default.decode(accessToken);
            const permissions = decode.authorities;
            if (permissions) {
                for (const permission of permissions) {
                    if (authority.includes(permission)) {
                        next();
                        return true;
                    }
                }
            }
        }
        next();
        res.send({ message: 'Access Denied', status: 403 });
    };
};
exports.checkPermission = checkPermission;
