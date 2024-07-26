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
exports.getUserByUsername = void 0;
exports.createUser = createUser;
const services_1 = __importDefault(require("../service/services"));
const user_1 = require("../persistence/entity/user");
const authenticateUser = (req, res, next) => {
    const customSession = req.session;
    if (customSession.user) {
        next();
    }
    else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            authenticateUser(req, res, () => __awaiter(this, void 0, void 0, function* () {
                console.log('Request object', req.body);
                const request = req.body;
                const user = yield services_1.default.userService.createUser(request);
                if (user) {
                    res.status(201).json(user);
                }
                else {
                    res.status(400).json({ message: 'Error creating user' });
                }
            }));
        }
        catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error-2' });
        }
    });
}
// export async function getUserByUsername(req: Request, res: Response) {
//     const { username } = req.params;
//     try {
//         authenticateUser(req, res, async () => {
//             const user = await services.userService.getUserByUsername(username);
//             if (user) {
//                 res.status(200).json(user)
//             } else {
//                 res.status(404).json({ message: 'User not found' });
//             }
//         })
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Internal server error-34' });
//     }
// }
const getUserByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.params;
        const decodedUsername = decodeURIComponent(username);
        const user = yield user_1.User.findOne({ where: { username: decodedUsername } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error('Error fetching user by username:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getUserByUsername = getUserByUsername;
