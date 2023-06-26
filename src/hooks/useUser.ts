import { useQuery } from "@tanstack/react-query"
import userService, { User } from "../services/user-service"

const useUser = (id:string, success?:()=>void) => useQuery<User,Error>({
    queryKey: ["user", id],
    // queryFn: () => APIClient<Category[]>("/api/categories").get()
    queryFn: () => userService.getById(id),
    onSuccess: success
})
export default useUser