import { useInfiniteQuery } from "@tanstack/react-query";
import { followingPostService } from "../services/post-service";


const useFollowingPosts = () => useInfiniteQuery({
  queryKey:["following-posts"],
  queryFn:()=>followingPostService.getAllResponse(),
  getNextPageParam:(lastPage, allPages) => {
    return lastPage.totalPages != allPages.length ? allPages.length + 1 : undefined;
  }
})
export default useFollowingPosts