import { useQuery } from "@tanstack/react-query";
import { User } from "./useUser";
import create from "../services/http-service";

export interface Comment {
    id:number;
    content:string;
    ctime:Date;
    utime:Date;
    postId:number;
    user:User;
}

const useComments = (postId:number | undefined) => {
  // if(!postId) {
  //   const data:Comment[] = [];
  //   return {data}
  // };
  return useQuery<Comment[],Error>({
  queryKey:[postId,"comments"],
  queryFn: () => create("/api/comments").get({params:{
    postId
  }}).then(resp => resp.data.data),
})}
export default useComments