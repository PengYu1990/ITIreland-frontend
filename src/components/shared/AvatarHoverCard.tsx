import {
  Avatar,
  Box,
  Button,
  createStyles,
  Flex,
  HoverCard,
  rem,
  Text,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { User } from "../../services/user-service";
import {
  IconArticle,
  IconCalendar,
  IconMapPin,
  IconMedal,
} from "@tabler/icons-react";
import { RiChatFollowUpLine } from "react-icons/ri";
import dayjs from "dayjs";
import AppConfig from "../../config.json";
import { useMutation, useQuery } from "@tanstack/react-query";
import APIClient from "../../services/http-service";
import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";
import { Response } from "../../services/http-service";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface Props {
  user: User;
}

const useStyles = createStyles((theme) => ({
  username: {
    textDecoration: "none",
    color: theme.colors.dark[4],
    fontFamily: `'Roboto Condensed', sans-serif`,
    padding: 0,
    marginRight: rem(5),
  },
  hoverCardItem: {
    fontSize: 13,
  },
}));

const AvatarHoverCard = ({ user }: Props) => {
  const { classes } = useStyles();
  const follow = (userId: number) => doFollow.mutate(userId);
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
    <HoverCard width={280} shadow="md">
      <HoverCard.Target>
        <Link to={`/user/${user.id}`}>
          <Avatar
            src={
              user.headShotUrl && `${AppConfig.config.api}${user.headShotUrl}`
            }
            color="cyan"
            radius="xl"
            size={40}
          >
            {user.username.substring(0, 2).toUpperCase()}
          </Avatar>
        </Link>
      </HoverCard.Target>
      <HoverCard.Dropdown style={{ paddingBottom: rem(2), padding: 0 }}>
        <Box style={{ padding: rem(20) }}>
          <Flex justify="left" gap={10}>
            <Link to={`/user/${user.id}`}>
              <Avatar
                src={
                  user.headShotUrl &&
                  `${AppConfig.config.api}${user.headShotUrl}`
                }
                color="cyan"
                radius="xl"
                size={50}
              >
                {user.username.substring(0, 2).toUpperCase()}
              </Avatar>
            </Link>
            <Box>
              <Link to={`/user/${user.id}`}>
                <Text className={classes.username}>{user.username}</Text>
              </Link>
              <Text className={classes.hoverCardItem}>
                {user.profile === undefined
                  ? user.profile
                  : "This guy is too lazy, he doesn't have profile!"}
              </Text>
            </Box>
          </Flex>
          <Flex justify="left" gap={10} mt={10}>
            <IconMapPin size={20} color="gray" />
            <Text className={classes.hoverCardItem}>Dublin, Ireland</Text>
          </Flex>
          <Flex justify="left" gap={10} mt={10}>
            <IconArticle size={20} color="gray" />
            <Text className={classes.hoverCardItem}>Posts {user.credits}</Text>
          </Flex>
          <Flex justify="left" gap={10} mt={10}>
            <IconMedal size={24} color="gray" />
            <Text className={classes.hoverCardItem}>Level {user.level}</Text>
          </Flex>
          <Flex justify="left" gap={10} mt={10}>
            <IconCalendar size={20} color="gray" />
            <Text className={classes.hoverCardItem}>
              Joined {dayjs(user.ctime).format("MM, YYYY")}
            </Text>
          </Flex>
        </Box>
        <Flex
          style={{
            borderTop: `${rem(1)} solid lightgray`,
          }}
          gap={50}
          justify="center"
        >
          <Button
            color="gray"
            leftIcon={<RiChatFollowUpLine size={20} spacing={0} />}
            styles={(theme) => ({
              root: {
                padding: rem(2),
                borderRadius: rem(20),
                border: 0,
                backgroundColor: "#ffffff",
                paddingLeft: rem(10),
                paddingRight: rem(10),
                "&:not([data-disabled])": theme.fn.hover({
                  backgroundColor: theme.colors.gray[0],
                }),
              },

              leftIcon: {
                marginRight: 0,
              },
            })}
            onClick={handleFollowOrUnfollow}
            variant={isFollowingUser ? "outline" : "light"}
            disabled={!currentUser || currentUser.id === user.id}
          >
            {isFollowingUser ? "Unfollow" : "Follow"}
          </Button>
          <Button
            variant="light"
            color="gray"
            leftIcon={<RiChatFollowUpLine size={20} spacing={0} />}
            styles={(theme) => ({
              root: {
                padding: rem(2),
                borderRadius: rem(20),
                border: 0,
                backgroundColor: "#ffffff",
                paddingLeft: rem(10),
                paddingRight: rem(10),
                "&:not([data-disabled])": theme.fn.hover({
                  backgroundColor: theme.colors.gray[0],
                }),
              },

              leftIcon: {
                marginRight: 0,
              },
            })}
          >
            Ask
          </Button>
        </Flex>
      </HoverCard.Dropdown>
    </HoverCard>
  );
};

export default AvatarHoverCard;
