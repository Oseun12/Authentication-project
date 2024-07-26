import { AppRole } from "../enums/app.role";

export interface UserModel {
    username: string;
    password: string;
    role: AppRole;
}