import { useInfiniteQuery } from "@tanstack/react-query";
import APIClient from "../services/http-service";
import postService, { Post } from "../services/post-service";



export interface PostQuery {
    category?: string;
    sorting?: string;
    searchText?: string;
    page?:number;
    size?:number;
  }

const usePosts = (postQuery:PostQuery) => useInfiniteQuery({
  queryKey:["posts", postQuery],
  queryFn:({pageParam=1})=>postService.getAllResponse({params:{
    category : postQuery?.category, 
    sorting:postQuery?.sorting,
    page:pageParam-1,
    size:postQuery.size
  }}),
  getNextPageParam:(lastPage, allPages) => {
    return lastPage.totalPages != allPages.length ? allPages.length + 1 : undefined;
  }
})

export default usePosts