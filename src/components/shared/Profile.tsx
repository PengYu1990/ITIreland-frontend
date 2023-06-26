import {
  Text,
  Avatar,
  Box,
  Flex,
  Tabs,
  createStyles,
  rem,
  Button,
} from "@mantine/core";
import { IconArticle, IconPhoto, IconSettings } from "@tabler/icons-react";
import { BiShare } from "react-icons/bi";
import { User } from "../../services/user-service";
import usePosts from "../../hooks/usePosts";
import React from "react";
import PostItem from "../index/PostItem";
import useFollowings from "../../hooks/useFollowings";
import useFollowers from "../../hooks/useFollowers";
import FollowerItem from "./FollowerItem";

import AppConfig from "../../config.json";

const useStyles = createStyles((theme) => ({
  username: {
    textDecoration: "none",
    color: theme.colors.dark[4],
    fontFamily: `'Roboto Condensed', sans-serif`,
    padding: 0,
  },
  profile: {
    marginTop: rem(3),
    padding: rem(10),
    backgroundColor: "#ffffff",
    minHeight: "50vh",
    marginBottom: rem(10),
  },
  profileHeader: {
    paddingBottom: rem(10),
  },
  profileHeadFollowers: {
    fontSize: rem(14),
    margin: rem(3),
  },
  followingItem: {
    borderBottom: "1px solid #eaeaea",
    padding: rem(10),
  },
  followingItemUsername: {
    fontSize: rem(18),
    fontFamily: `'Open Sans', sans-serif`,
  },
  followingItemFollowers: {
    fontSize: rem(14),
  },
}));

interface Props {
  user: User;
}

const Profile = ({ user }: Props) => {
  const { classes } = useStyles();
  const { data: posts } = usePosts({ userId: user.id });
  const { data: followings } = useFollowings(user.id);
  const { data: followers } = useFollowers(user.id);

  return (
    <Box className={classes.profile}>
      <Flex
        className={classes.profileHeader}
        justify="space-between"
        direction="row"
      >
        <Flex gap={20} justify="flex-start" direction="row">
          <Avatar
            component="a"
            radius="xl"
            src={
              user?.headShotUrl && `${AppConfig.config.api}${user.headShotUrl}`
            }
            alt="it's me"
            size="xl"
          />
          <Box>
            <Text className={classes.username}>{user?.username}</Text>
            <Text>{user?.email}</Text>
            <Text className={classes.profileHeadFollowers}>
              0 followers · 0 following
            </Text>
            <Flex gap={10}>
              <Button size="xs">Follow</Button>
              <Button variant="default" size="xs">
                Ask
              </Button>
            </Flex>
          </Box>
        </Flex>
        <BiShare size="25" />
      </Flex>
      <Tabs defaultValue="about">
        <Tabs.List>
          <Tabs.Tab value="about" icon={<IconPhoto size="0.8rem" />}>
            About
          </Tabs.Tab>
          <Tabs.Tab value="posts" icon={<IconArticle size="0.8rem" />}>
            Posts
          </Tabs.Tab>
          <Tabs.Tab value="followings" icon={<IconArticle size="0.8rem" />}>
            Followings
          </Tabs.Tab>
          <Tabs.Tab value="followers" icon={<IconArticle size="0.8rem" />}>
            Followers
          </Tabs.Tab>
          <Tabs.Tab value="settings" icon={<IconSettings size="0.8rem" />}>
            Settings
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="about" pt="xs">
          {user?.profile}
        </Tabs.Panel>

        <Tabs.Panel value="posts" pt="xs">
          {posts?.pages?.map((page, key) => (
            <React.Fragment key={key}>
              {page?.data?.map((post, key) => (
                <PostItem key={key} post={post} />
              ))}
            </React.Fragment>
          ))}
        </Tabs.Panel>

        <Tabs.Panel value="followings" pt="xs">
          {followings?.map((following, key) => (
            <FollowerItem key={key} following={following} />
          ))}
        </Tabs.Panel>
        <Tabs.Panel value="followers" pt="xs">
          {followers?.map((followers, key) => (
            <FollowerItem key={key} following={followers} />
          ))}
        </Tabs.Panel>

        <Tabs.Panel value="settings" pt="xs">
          Settings tab content
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};

export default Profile;
