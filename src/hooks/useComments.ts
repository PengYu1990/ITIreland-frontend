import { useQuery } from "@tanstack/react-query";
import commentService, { Comment } from "../services/comment-service";



const useComments = (postId:number | undefined) => {
  return useQuery<Comment[],Error>({
  queryKey:[postId,"comments"],
  queryFn: () => commentService.getAll({params:{
    postId
  }})
})}
export default useComments