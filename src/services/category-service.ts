import APIClient from "./http-service";

export interface Category {
    category:string;
}

const categoryService = APIClient<Category>("/api/categories")

export default categoryService;