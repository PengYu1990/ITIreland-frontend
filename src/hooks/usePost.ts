import { useState } from "react";
import { Post } from "./usePosts";
import useSingleData from "./useSingleData";

const usePost = (id:string|undefined) => {
    if(id === undefined){
        const [data, setData] = useState<Post>();
        const [error, setError] = useState("");
        const [isLoading, setLoading] = useState(false);
        return {data, setData, error, setError,isLoading, setLoading}
    }
    return useSingleData<Post>("/api/posts/"+id, [id])
}
export default usePost