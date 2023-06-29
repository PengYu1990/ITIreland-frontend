import APIClient from "./http-service";

export interface Category {
    category:string;
}

const categoryService = APIClient<Category>("/categories")

export default categoryService;