import APIClient from "./http-service";
import { User } from "./user-service";

const followerService = (userId:number) => APIClient<User>(`/followers/${userId}`)

export default followerService;