import { useQuery } from "@tanstack/react-query";
import create from "../services/http-service";


const usePost = (id:string | undefined) => useQuery({
    queryKey:[id,"post"],
    queryFn:()=>create(`/api/posts/${id}`)
            .get()
            .then(resp=>resp.data.data)})
export default usePost