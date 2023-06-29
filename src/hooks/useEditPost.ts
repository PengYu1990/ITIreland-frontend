import { Post } from "../services/post-service";
import useSingleData from "./useSingleData";

const useEditPost = (id:string | undefined) => {
    if(!id){
        const data = null;
        return{data};
    } 
    return useSingleData<Post>(`/posts/${id}`,[id])
}

export default useEditPost