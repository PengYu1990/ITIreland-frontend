import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { User } from "../../services/user-service";
import APIClient, { Response } from "../../services/http-service";
import { Button } from "@mantine/core";
import { useAuth } from "../context/AuthContext";
import { RiChatFollowUpLine } from "react-icons/ri";
import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";

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
        ? APIClient<Boolean>(`/isFollowing/${user.id}`).get()
        : Promise.resolve(false),
    onSuccess: (data) => {
      setIsFollowingUser(data);
    },
  });

  // handle follow or unfollow
  const handleFollowOrUnfollow = () => {
    if (isFollowingUser) {
      doUnFollow.mutate(user.id);
    } else {
      doFollow.mutate(user.id);
    }
  };

  // do follow
  const doFollow = useMutation<any, AxiosError<Response<null>>, number>({
    mutationFn: (userId) => APIClient(`/follow/${userId}`).post(null),
    onSuccess: () => {
      setIsFollowingUser(true);
    },
    onError: (error) => {
      notifications.show({
        title: "Notification",
        message: error.response?.data.message,
        color: "red",
      });
    },
  });

  // do unfollow
  const doUnFollow = useMutation<any, AxiosError<Response<null>>, number>({
    mutationFn: (userId: number) => APIClient(`/unfollow/${userId}`).post(null),
    onSuccess: () => {
      setIsFollowingUser(false);
    },
    onError: (error) => {
      notifications.show({
        title: "Notification",
        message: error.response?.data.message,
        color: "red",
      });
    },
  });

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
