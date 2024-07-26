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
exports.signup = void 0;
exports.getLogin = getLogin;
exports.postLogin = postLogin;
exports.getSignup = getSignup;
exports.logout = logout;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const services_1 = __importDefault(require("../service/services"));
function getLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send('Login');
    });
}
function postLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        try {
            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password required' });
            }
            //Find user by Username
            const user = yield services_1.default.userService.getUserByUsername(username);
            console.log('User found:', user);
            if (!user) {
                return res.status(401).json({ message: 'Invalid username' });
            }
            // Log the plain text password and hashed password
            console.log('Plain text password:', password);
            console.log('Hashed password:', user.password);
            // Compare password
            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
            console.log('Password valid:', isPasswordValid);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }
            //After successful login, generate token and set session
            const token = yield services_1.default.authService.generateToken(username, password);
            req.session.user = user.username;
            res.json({ data: {
                    access_token: token.access_token,
                    expires_in: token.expires_in
                },
                message: 'Login successfully',
                status: 200
            });
        }
        catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
}
function getSignup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send('Signup');
    });
}
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, role } = req.body;
        // Check if the user already exists
        const existingUser = yield services_1.default.userService.getUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Log the plain text password
        console.log('Plain text password:', password);
        // Hash the password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Log the hashed password
        console.log('Hashed password:', hashedPassword);
        // Create a new user
        const newUser = yield services_1.default.userService.createUser({
            username,
            password: hashedPassword,
            role
        });
        res.status(201).json({ message: 'User created successfully', user: newUser });
    }
    catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.signup = signup;
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        req.session.destroy((err) => {
            if (err) {
                console.log('Error logging out:', err);
                res.status(500).json({ message: 'Internal server Error-5' });
            }
            else {
                res.json({ message: 'Logout Successfully' });
            }
        });
    });
}
