import { useQuery } from "@tanstack/react-query";
import { User } from "../services/user-service";
import followerService from "../services/follower-service";

const useFollowers = (userId: number) => {
    return useQuery<User[],Error>({
    queryKey:[userId,"followers"],
    queryFn: () => followerService(userId).getAll(),
  })};

export default useFollowers;