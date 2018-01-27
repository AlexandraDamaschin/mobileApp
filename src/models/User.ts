export class User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    registrationDate: string;
    uid: string;
    userName: string;

    constructor() {
       
    }

    fireBase(): User{
        var copy = this;
        delete copy.password;
        return copy;
    }
}