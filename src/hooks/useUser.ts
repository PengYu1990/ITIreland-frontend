import { useQuery } from "@tanstack/react-query"
import userService, { User } from "../services/user-service"

const useUser = (id:string) => useQuery<User,Error>({
    queryKey: ["user"],
    // queryFn: () => APIClient<Category[]>("/api/categories").get()
    queryFn: () => userService.getById(id)
})
export default useUser