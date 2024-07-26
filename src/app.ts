import express from "express";
import DatabaseConfig from "./config/database";
import Routes from './routes/route.interface';
import bodyParser from "body-parser";
import session from "express-session";
import { Session } from "express-session";
import { Request, Response } from "express";
import UserRoute from "./routes/userRoutes";
import AuthRouth from "./routes/authRoutes";
import * as authController from './controller/auth.controller';
import path from "path";

interface CustomSession extends Session {
    isLoggedIn?: boolean;
    username?: string;
}

export default class App {
    public app: express.Application;
    public port: number;

    constructor(routes:Routes[]) {
        this.app = express();
        this.port = process.env.PORT? parseInt(process.env.PORT) : 5500;
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.connectDatabase();
        // this.setupTestRoutes();
        // this.setupStaticFiles();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log('app', `App listening on port ${this.port}`);
        });
    }

    public getServer() {
        return this.app;
    }

    private initializeMiddlewares() {
        this.app.use(session({
            secret: 'somesecret',
            resave: false,
            saveUninitialized: true
        }));

        const authenticateUser = (req: Request, res: Response, next: Function) => {
            const customSession = req.session as CustomSession;
            if(customSession.isLoggedIn) {
                console.log('User is authenticated')
                next();
            } else {
                res.status(401).json({ message: 'Unauthorized' });
            }
        }
        this.app.use('/logout', authenticateUser);
        
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        // this.app.use(express.static('public'))
        this.app.use(express.static(path.join(__dirname, '..', 'public')));

    }

    private initializeRoutes(routes: Routes[]) {
        console.log('app.initializeRoutes', 'Initializing routes...');
        routes.forEach((route) => {
            this.app.use('', route.router);
        });

        this.app.post('/signup', authController.signup);
        this.app.post('/login', authController.postLogin);
        this.app.post('/logout', authController.logout);
    }

    private connectDatabase() {
        const database: DatabaseConfig = new DatabaseConfig();
		database.connect();
	}


    // private setupTestRoutes() {
    //     // Test route for signing up a user
    //     this.app.post('/signup', (req: Request, res: Response) => {
    //         const { username, password } = req.body;
    //         if (username && password) {
    //             const customSession = req.session as CustomSession;
    //             customSession.isLoggedIn = true;
    //             customSession.username = username;
    //             res.status(200).json({ message: 'Signup successful', username });
    //         } else {
    //             res.status(400).json({ message: 'Username and password required' });
    //         }
    //     });

    //     // Test route for logging in a user
    //     this.app.post('/login', (req: Request, res: Response) => {
    //         const { username, password } = req.body;
    //         console.log('Login attempt:', username);
    //         if (username === 'testuser' && password === 'testpass') {
    //             const customSession = req.session as CustomSession;
    //             customSession.isLoggedIn = true;
    //             customSession.username = username;
    //             res.status(200).json({ message: 'Login successful', username });
    //         } else {
    //             res.status(401).json({ message: 'Invalid credentials' });
    //         }
    //     });

    //     // Test route for logging out a user
    //     this.app.post('/logout', (req: Request, res: Response) => {
    //         const customSession = req.session as CustomSession;
    //         customSession.isLoggedIn = false;
    //         res.status(200).json({ message: 'Logout successful' });
    //     });
    // }

   
}

