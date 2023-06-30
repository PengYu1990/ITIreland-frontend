import { Avatar, Box, Flex, createStyles, rem } from "@mantine/core";
import AppConfig from "../../config.json";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  form: {
    padding: rem(10),
    paddingTop: rem(20),
    paddingBottom: rem(20),
    backgroundColor: "#ffffff",
    marginBottom: rem(10),
  },
  editor: {
    marginLeft: rem(10),
    color: theme.colors.dark[3],
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    backgroundColor: "#f2f2f2",
    padding: rem(10),
    borderRadius: rem(30),
    // width: "100%",
  },
}));

const AddPost = () => {
  const { classes } = useStyles();

  const { user } = useAuth();

  return (
    <Link to="/edit">
      <Flex className={classes.form} justify="left" direction="row">
        <Avatar
          src={
            user &&
            user.headShotUrl &&
            `${AppConfig.config.api}${user.headShotUrl}`
          }
          color="cyan"
          radius="xl"
          size={40}
        >
          {user && user.username.substring(0, 2).toUpperCase()}
        </Avatar>
        <Box className={classes.editor}>What do you want to post?</Box>
      </Flex>
    </Link>
  );
};

export default AddPost;
