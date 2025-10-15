import { role } from "./Role";
export class User {
    constructor(public id:string | undefined ,
        public name:string,
        public email:string,
        public password:string,
        public role:role,
        public createdAt:Date,
        public updatedAt:Date
    ){

    }
}