import { useQuery } from "@tanstack/react-query";
import categoryService, { Category } from "../services/category-service";

const useCategories = () => useQuery<Category[],Error>({
    queryKey: ["categories"],
    // queryFn: () => APIClient<Category[]>("/api/categories").get()
    queryFn: categoryService.getAll
})
export default useCategories