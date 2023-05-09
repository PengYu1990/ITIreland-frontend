import APIClient from "./http-service";
import { User } from "./user-service";

export interface Comment {
    id:number;
    content:string;
    ctime:Date;
    utime:Date;
    postId:number;
    user:User;
}

const commentService = APIClient<Comment>("/api/comments")

export default commentService;