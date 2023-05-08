import { useQuery } from "@tanstack/react-query";
import create from "../services/http-service";

export interface Category {
    category:string;
}
// const useCategories = () => usedata<Category>("/api/categories")
const useCategories = () => useQuery<Category[],Error>({
    queryKey: ["categories"],
    queryFn: () => create<Category[]>("/api/categories").get().then(resp=>resp.data.data),
})
export default useCategories