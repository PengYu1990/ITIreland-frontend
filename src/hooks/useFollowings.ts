import { useQuery } from "@tanstack/react-query";
import followingService from "../services/following-service";
import { User } from "../services/user-service";

const useFollowings = (userId: number) => {
    return useQuery<User[],Error>({
    queryKey:[userId,"followings"],
    queryFn: () => followingService(userId).getAll(),
  })};

export default useFollowings;