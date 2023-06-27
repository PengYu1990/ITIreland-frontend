import { Avatar, Box, Flex, Text, createStyles, rem } from "@mantine/core";
import { User } from "../../services/user-service";

import AppConfig from "../../config.json";
import { Link } from "react-router-dom";
import FollowBtn from "./FollowBtn";

const useStyles = createStyles(() => ({
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
  following: User;
}

const FollowerItem = ({ following }: Props) => {
  const { classes } = useStyles();
  return (
    <Flex justify="space-between" className={classes.followingItem}>
      <Flex gap={20} justify="flex-start" direction="row">
        <Link to={`/user/${following.id}`}>
          <Avatar
            color="cyan"
            radius="xl"
            size={35}
            src={
              following.headShotUrl &&
              `${AppConfig.config.api}${following.headShotUrl}`
            }
          />
        </Link>
        <Box>
          <Link to={`/user/${following.id}`}>
            <Text className={classes.followingItemUsername}>
              {following.username}
            </Text>
          </Link>
          <Text className={classes.followingItemFollowers}>0 followers</Text>
        </Box>
      </Flex>
      <FollowBtn user={following} variant="outline" />
    </Flex>
  );
};

export default FollowerItem;
