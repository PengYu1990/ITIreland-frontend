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
    thumbs:number;//点赞数
    category:string;
    userId:number;
    user:User;
    tags:Tag[];
    commentCount:number; //评论数
}

const postService = APIClient<Post>("/posts")
const followingPostService = APIClient<Post>("/posts/following")

export {followingPostService};

export default postService;