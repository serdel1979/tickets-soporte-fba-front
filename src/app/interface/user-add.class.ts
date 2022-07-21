import { Role } from "../role/role.enum";

export class UserAdd {
    user: string | undefined;
    password: string | undefined;
    roles:Role[] | undefined;

    constructor (nombre: string, password: string, rol: Role){
        this.user = nombre;
        this.password = password;
        this.roles = [rol];
    }
}