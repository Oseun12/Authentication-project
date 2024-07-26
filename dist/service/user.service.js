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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.getUserByUsername = getUserByUsername;
const app_utils_1 = require("../core/app.utils");
const user_1 = require("../persistence/entity/user");
function createUser(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check if user already exists
            const user = yield user_1.User.findOne({ where: { username: request.username } });
            console.log('Checked for existing user:', user);
            if (user) {
                console.log('User already exists');
                throw new Error('User already exists');
            }
            // Log the incoming request
            console.log('Incoming request:', request);
            //Hash Password
            const hashedPassword = yield app_utils_1.AppUtils.generateHashPassword(request.password);
            console.log('Hashed Password:', hashedPassword);
            if (!hashedPassword) {
                console.error('Error hashing password');
                throw new Error('Error hashing password');
            }
            // Create a new user
            const newUser = user_1.User.build({
                username: request.username,
                password: hashedPassword,
                role: request.role
            });
            //Save User
            const savedUser = yield newUser.save();
            console.log('User created successfully');
            return savedUser;
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message === 'User already exists') {
                    console.error('Error creating user:', error.message);
                    throw new Error('User already exists');
                }
                else if (error.message === 'Error hashing password') {
                    console.error('Error creating user:', error.message);
                    throw new Error('Error hashing password');
                }
                else {
                    console.error('Error creating user:', error);
                    throw new Error('Internal server error');
                }
            }
            else {
                console.error('Unknown error:', error);
                throw new Error('Internal server error');
            }
        }
    });
}
function getUserByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_1.User.findOne({ where: { username } });
            return user;
        }
        catch (error) {
            console.error('Error fetching user by username:', error);
            throw new Error('user not found');
        }
    });
}
