import { Box, List, createStyles, rem } from "@mantine/core";
import { Link } from "react-router-dom";
import usePosts from "../../hooks/usePosts";
import { PostQuery } from "../../hooks/usePosts";

const useStyles = createStyles((theme) => ({
  hotPostBox: {
    backgroundColor: "white",
    marginBottom: rem(20),
  },
  heading: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
    textAlign: "center",
    fontFamily: `'Roboto Condensed', sans-serif`,
    padding: rem(10),
    color: theme.colors.dark[5],
  },
  titles: {
    paddingLeft: rem(10),
    paddingRight: rem(20),
    textDecoration: "none",
    color: "black",
    paddingBottom: rem(3),
  },
  title: {
    marginBottom: rem(5),
  },
}));

const HotPost = () => {
  const { classes } = useStyles();
  const postQuery: PostQuery = { sorting: "views", size: 5 };
  const { data } = usePosts(postQuery);
  return (
    <Box className={classes.hotPostBox}>
      <h4 className={classes.heading}>Hot Post</h4>
      <List className={classes.titles}>
        {data.data.map((post) => (
          <Link key={post.id} to={`/post/${post.id}`}>
            <List.Item className={classes.title}>{post.title}</List.Item>
          </Link>
        ))}
      </List>
    </Box>
  );
};

export default HotPost;
