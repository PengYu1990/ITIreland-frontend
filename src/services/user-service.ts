import APIClient from "./http-service";
export interface User {
    id:number;
    username:string;
    password:string;
    password2:string;
    email:string;
    profile:string;
    state:number;
    credits:number; //积分
    level:number; //等级
    headShotUrl:string;
    ctime:Date;
    token:string;
    location:string; //位置
    posts:number; //帖子数
}

const userService = APIClient<User>("/users")

export default userService;