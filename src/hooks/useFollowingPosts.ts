import { useInfiniteQuery } from "@tanstack/react-query";
import { followingPostService } from "../services/post-service";
import { PostQuery } from "./usePosts";


const useFollowingPosts = (postQuery:PostQuery) => useInfiniteQuery({
  queryKey:["posts", postQuery],
  queryFn:({pageParam=1})=>followingPostService.getAllResponse({params:{
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
export default useFollowingPosts