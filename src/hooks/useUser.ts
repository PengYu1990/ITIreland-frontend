import { useQuery } from "@tanstack/react-query"
import userService, { User } from "../services/user-service"

const useUser = (id:string, success?:(user:User)=>void) => useQuery<User,Error>({
    queryKey: ["user", id],
    // queryFn: () => APIClient<Category[]>("/api/categories").get()
    queryFn: () => userService.getById(id),
    onSuccess: (user) => {
        if(success) return success(user)
    }
})
export default useUser