import { Comment } from "./useComments";
import usedata from "./useData"
import { User } from "./useUser";
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

export interface PostQuery {
    category?: string;
    sorting?: string;
    searchText?: string;
    page?:number;
    size?:number;
  }
  
const usePosts = (postQuery:PostQuery) => usedata<Post>("/api/posts",{ 
    params : { 
      category : postQuery?.category, 
      sorting:postQuery?.sorting,
      page:postQuery.page,
      size:postQuery.size
    }},[postQuery])
export default usePosts