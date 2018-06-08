import { Login } from './login';
export class User {
    firstName: string;
    surname: string;
    email : string;
    mobile : string;
    login : Login;

    constructor(firstName : string, surname :string , email : string, mobile : string) {
        this.email = email;
        this.firstName = firstName;
        this.mobile = mobile;
        this.surname = surname;
    }
}