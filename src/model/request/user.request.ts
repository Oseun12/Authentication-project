import { AppRole } from "../enums/app.role";

export interface UserRequest {
    username: string;
    password: string;
    role: AppRole;
}