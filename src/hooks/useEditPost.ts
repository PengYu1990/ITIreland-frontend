import { Post } from "./usePosts";
import useSingleData from "./useSingleData";

const useEditPost = (id:string | undefined) => useSingleData<Post>(`/api/posts/${id}`,[id])

export default useEditPost