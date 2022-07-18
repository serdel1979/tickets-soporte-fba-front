import { Role } from "../role/role.enum";

export interface User {
    user: string;
    password: string;
    roles:Role[];
    token: string;
}