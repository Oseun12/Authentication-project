import { Router } from "express";
import * as userController from '../controller/user.controller';
import RouteInterface from "./route.interface";

export default class UserRoute implements RouteInterface {
    public router: Router = Router();
    
    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get('/users/:username', userController.getUserByUsername);
        this.router.post('/users', userController.createUser);
    }
}