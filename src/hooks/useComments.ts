import { useQuery } from "@tanstack/react-query";
import { Post } from "./usePosts";
import { User } from "./useUser";
import create from "../services/http-service";

export interface Comment {
    id:number;
    content:string;
    ctime:Date;
    utime:Date;
    post:Post;
    user:User;
}

const useComments = (postId:number | undefined) => {
  return useQuery<Comment[],Error>({
  queryKey:[postId,"comments"],
  queryFn: () => create("/api/comments").get({params:{
    postId
  }}).then(resp => resp.data.data),
})}
export default useComments