import { useQuery } from "@tanstack/react-query";
import postService from "../services/post-service";
const usePost = (id:string | undefined) => useQuery({
    queryKey:["post", id],
    queryFn:()=>postService.getById(id),
        })
export default usePost