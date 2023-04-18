export class User{
    userId: number;
    firstName: string;
    lastName: string;
    email:string;
    password: string;
    isAdmin: number;

    constructor(id: number, firstname: string, lastname: string, email: string, password: string, isadmin: number){
        this.userId = id;
        this.firstName = firstname;
        this.lastName = lastname;
        this.email = email;
        this.password = password;
        this.isAdmin = isadmin;
    }

}