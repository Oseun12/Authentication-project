import { Router } from "express";
import RouteInterface from "./route.interface";
import * as authController from "../controller/auth.controller";
import { signup } from "../controller/auth.controller";

import { Request, Response } from "express";

export default class AuthRouth implements RouteInterface {
    public router: Router = Router();

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
    this.router.get('/login', authController.getLogin);
    this.router.post('/login', authController.postLogin);
    this.router.get('/logout', authController.logout);
    this.router.get('/signup', authController.signup);
    this.router.post('/signup', signup);    
    }
}