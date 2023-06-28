import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { User } from "../../services/user-service";
import APIClient from "../../services/http-service";
import { Button } from "@mantine/core";
import { useAuth } from "../context/AuthContext";
import { RiChatFollowUpLine } from "react-icons/ri";

interface Props {
  user: User;
  variant?: string;
}

const FollowBtn = ({ user, variant = "filled" }: Props) => {
  const [isFollowingUser, setIsFollowingUser] = useState<Boolean>(false);
  const { user: currentUser } = useAuth();

  useQuery<Boolean, Error>({
    queryKey: ["isFollowing", user.id, currentUser?.id],
    queryFn: () =>
      currentUser
        ? APIClient<Boolean>(`/api/isFollowing/${user.id}`).get()
        : Promise.resolve(false),
    onSuccess: (data) => {
      setIsFollowingUser(data);
    },
  });

  const handleFollowOrUnfollow = () => {
    if (isFollowingUser) {
      APIClient(`/api/unfollow/${user.id}`).post(null);
      setIsFollowingUser(false);
    } else {
      APIClient(`/api/follow/${user.id}`).post(null);
      setIsFollowingUser(true);
    }
  };

  return (
    <Button
      leftIcon={<RiChatFollowUpLine />}
      onClick={handleFollowOrUnfollow}
      size="xs"
      variant={isFollowingUser ? "outline" : variant}
      disabled={!currentUser || currentUser.id === user.id}
    >
      {isFollowingUser ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowBtn;
