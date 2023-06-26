import APIClient from "./http-service";
import { User } from "./user-service";

const followingService = (userId:number) => APIClient<User>(`/api/followings/${userId}`)

export default followingService;