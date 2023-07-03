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
    upvotes:number;
    downvotes:number;
    category:string;
    userId:number;
    user:User;
    tags:Tag[];
    commentCount:number; //评论数
    upvoted:boolean; //是否点赞
    downvoted:boolean; //是否点踩
}

const postService = APIClient<Post>("/posts")
const followingPostService = APIClient<Post>("/posts/following")

export {followingPostService};

export default postService;