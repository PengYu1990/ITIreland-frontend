import APIClient from "./http-service";
import { User } from "./user-service";

interface Tag {
    tag:string;
}

export interface Post {
    id:number;
    title:string;
    content:string;
    ctime:Date;
    utime:Date;
    views:number;
    thumbs:number;
    category:string;
    userId:number;
    user:User;
    tags:Tag[];
}

const postService = APIClient<Post>("/api/posts")

export default postService;