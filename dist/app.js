"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT ? parseInt(process.env.PORT) : 5500;
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.connectDatabase();
        this.setupTestRoutes();
        // this.setupStaticFiles();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('app', `App listening on port ${this.port}`);
        });
    }
    getServer() {
        return this.app;
    }
    initializeMiddlewares() {
        this.app.use((0, express_session_1.default)({
            secret: 'somesecret',
            resave: false,
            saveUninitialized: true
        }));
        const authenticateUser = (req, res, next) => {
            const customSession = req.session;
            if (customSession.isLoggedIn) {
                console.log('User is authenticated');
                next();
            }
            else {
                res.status(401).json({ message: 'Unauthorized' });
            }
        };
        this.app.use('/logout', authenticateUser);
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json());
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'index.html')));
    }
    initializeRoutes(routes) {
        console.log('app.initializeRoutes', 'Initializing routes...');
        routes.forEach((route) => {
            this.app.use('', route.router);
        });
    }
    connectDatabase() {
        const database = new database_1.default();
        database.connect();
    }
    setupTestRoutes() {
        // Test route for signing up a user
        this.app.post('/signup', (req, res) => {
            const { username, password } = req.body;
            if (username && password) {
                const customSession = req.session;
                customSession.isLoggedIn = true;
                customSession.username = username;
                res.status(200).json({ message: 'Signup successful', username });
            }
            else {
                res.status(400).json({ message: 'Username and password required' });
            }
        });
        // Test route for logging in a user
        this.app.post('/login', (req, res) => {
            const { username, password } = req.body;
            if (username === 'testuser' && password === 'testpass') {
                const customSession = req.session;
                customSession.isLoggedIn = true;
                customSession.username = username;
                res.status(200).json({ message: 'Login successful', username });
            }
            else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        });
        // Test route for logging out a user
        this.app.post('/logout', (req, res) => {
            const customSession = req.session;
            customSession.isLoggedIn = false;
            res.status(200).json({ message: 'Logout successful' });
        });
    }
}
exports.default = App;
