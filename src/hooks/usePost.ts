import { Post } from "./usePosts";
import useSingleData from "./useSingleData";

const usePost = (id:string) => useSingleData<Post>("/api/posts/"+id, [id])
export default usePost