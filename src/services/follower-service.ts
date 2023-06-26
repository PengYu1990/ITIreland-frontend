import APIClient from "./http-service";
import { User } from "./user-service";

const followerService = (userId:number) => APIClient<User>(`/api/followers/${userId}`)

export default followerService;