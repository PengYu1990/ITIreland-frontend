import { User } from "../services/user-service"
import useData from "./useData"

const useUser = () => useData<User>("/api/users")
export default useUser