import { Post } from "./usePosts";
import useSingleData from "./useSingleData";

const useEditPost = (id:string | undefined) => {
    if(!id){
        const data = null;
        return{data};
    } 
    return useSingleData<Post>(`/api/posts/${id}`,[id])
}

export default useEditPost