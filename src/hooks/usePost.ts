import { Post } from "./usePosts";
import useSingleData from "./useSingleData";

const usePost = (id="1") => useSingleData<Post>("/api/posts/"+id, [id])
export default usePost