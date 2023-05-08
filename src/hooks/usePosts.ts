import { useInfiniteQuery } from "@tanstack/react-query";
import { FetchResponse } from "./useData"
import { User } from "./useUser";
import create from "../services/http-service";
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

    const usePosts = (postQuery:PostQuery) => useInfiniteQuery<FetchResponse<Post>,Error>({
      queryKey:["posts", postQuery],
      queryFn:({pageParam=1})=>create("/api/posts").get({params:{
        category : postQuery?.category, 
        sorting:postQuery?.sorting,
        page:pageParam-1,
        size:postQuery.size
      }}).then(resp=>resp.data),
      getNextPageParam:(lastPage, allPages) => {
        return lastPage.totalPages != allPages.length ? allPages.length + 1 : undefined;
      }
    })

export default usePosts