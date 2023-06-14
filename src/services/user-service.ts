import APIClient from "./http-service";
export interface User {
    id:number;
    username:string;
    password:string;
    password2:string;
    email:string;
    profile:string;
    state:number;
    credits:number;
    level:number;
    headShotUrl:string;
    ctime:Date;
    token:string;
}

const userService = APIClient<User>("/api/users")

export default userService;