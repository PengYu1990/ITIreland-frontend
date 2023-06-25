import {
  Text,
  Avatar,
  Box,
  Flex,
  Tabs,
  createStyles,
  rem,
} from "@mantine/core";
import { IconArticle, IconPhoto, IconSettings } from "@tabler/icons-react";
import { BiShare } from "react-icons/bi";
import { User } from "../../services/user-service";
import usePosts from "../../hooks/usePosts";
import React from "react";

const useStyles = createStyles((theme) => ({
  username: {
    textDecoration: "none",
    color: theme.colors.dark[4],
    fontFamily: "Pathway Extreme",
    padding: 0,
  },
  profile: {
    marginTop: rem(20),
  },
  profileHeader: {
    paddingBottom: rem(10),
  },
}));

interface Props {
  user: User;
}

const Profile = ({ user }: Props) => {
  const { classes } = useStyles();
  const { data: posts } = usePosts({ userId: user.id });

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
            src={`http://localhost:8080/api${user?.headShotUrl}`}
            alt="it's me"
            size="xl"
          />
          <Box>
            <Text className={classes.username}>{user?.username}</Text>
            <Text>{user?.email}</Text>
            <Text>0 followers · 0 following</Text>
          </Box>
        </Flex>
        <BiShare size="25" />
      </Flex>
      <Tabs defaultValue="profile">
        <Tabs.List>
          <Tabs.Tab value="profile" icon={<IconPhoto size="0.8rem" />}>
            Profile
          </Tabs.Tab>
          <Tabs.Tab value="posts" icon={<IconArticle size="0.8rem" />}>
            Posts
          </Tabs.Tab>
          <Tabs.Tab value="settings" icon={<IconSettings size="0.8rem" />}>
            Settings
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="profile" pt="xs">
          Profile tab content
        </Tabs.Panel>

        <Tabs.Panel value="posts" pt="xs">
          {posts?.pages?.map((page, key) => (
            <React.Fragment key={key}>
              {page?.data?.map((post, key) => (
                <Box key={key}>{post?.title}</Box>
              ))}
            </React.Fragment>
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
