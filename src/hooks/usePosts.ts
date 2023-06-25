import { useInfiniteQuery } from "@tanstack/react-query";
import postService from "../services/post-service";



export interface PostQuery {
    category?: string;
    sorting?: string;
    searchText?: string;
    page?:number;
    size?:number;
    userId?:number;
  }

const usePosts = (postQuery:PostQuery) => useInfiniteQuery({
  queryKey:["posts", postQuery],
  queryFn:({pageParam=1})=>postService.getAllResponse({params:{
    category : postQuery?.category, 
    sorting:postQuery?.sorting,
    page:pageParam-1,
    size:postQuery.size,
    userId:postQuery.userId,
  }}),
  getNextPageParam:(lastPage, allPages) => {
    return lastPage.totalPages != allPages.length ? allPages.length + 1 : undefined;
  }
})

export default usePosts