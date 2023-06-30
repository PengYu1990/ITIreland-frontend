import {
  Avatar,
  Box,
  Flex,
  Indicator,
  Spoiler,
  Text,
  createStyles,
  rem,
} from "@mantine/core";
import dayjs from "dayjs";
// extend dayjs
import relativeTime from "dayjs/plugin/relativeTime";
import PostMeta from "./PostMeta";
import { Link } from "react-router-dom";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import TiptapLink from "@tiptap/extension-link";
import { Post } from "../../services/post-service";
import AppConfig from "../../config.json";
import APIClient from "../../services/http-service";
dayjs.extend(relativeTime);

const useStyles = createStyles((theme) => ({
  postItem: {
    backgroundColor: "#ffffff",
    paddingLeft: rem(10),
    paddingRight: rem(10),
    paddingTop: rem(10),
    paddingBottom: rem(10),
    marginBottom: rem(10),
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  heading: {
    textDecoration: "none",
    color: theme.colors.dark[4],
    fontFamily: `'Roboto Condensed', sans-serif`,
    padding: 0,
    marginTop: rem(10),
    marginBottom: rem(5),
    paddingLeft: rem(10),
  },
  summary: {
    textDecoration: "none",
    color: theme.colors.dark[4],
    padding: rem(10),
    paddingTop: 0,
  },
  username: {
    textDecoration: "none",
    color: theme.colors.dark[4],
    fontFamily: `'Roboto Condensed', sans-serif`,
    padding: 0,
    marginRight: rem(5),
  },
  datetime: {
    fontSize: 13,
  },
  follow: {
    fontSize: 14,
    color: theme.colors.blue,
    marginLeft: rem(5),
    textDecorationColor: theme.colors.blue,
    cursor: "pointer",
  },
}));

interface Props {
  post: Post;
}

const PostItem = ({ post }: Props) => {
  const { classes } = useStyles();

  const follow = (userId: number) => {
    APIClient(`/follow/${userId}`).post(null);
  };

  return (
    <Indicator
      inline
      color="red"
      offset={14}
      position="top-end"
      label={post.views > 100 && "Hot"}
      disabled={post.views < 100}
      size={16}
    >
      <Box className={classes.postItem}>
        <Flex justify="left" gap={10}>
          <Link to={`/user/${post.user.id}`}>
            <Avatar
              src={
                post.user.headShotUrl &&
                `${AppConfig.config.api}${post.user.headShotUrl}`
              }
              color="cyan"
              radius="xl"
              size={40}
            >
              {post.user.username.substring(0, 2).toUpperCase()}
            </Avatar>
          </Link>
          <Box>
            <Flex align="center">
              <Link to={`/user/${post.user.id}`}>
                <Text className={classes.username}> {post.user.username}</Text>
              </Link>
              ·
              <Box
                className={classes.follow}
                onClick={() => follow(post.user.id)}
              >
                Follow
              </Box>
            </Flex>

            <Text className={classes.datetime}>
              {dayjs(post.ctime).fromNow()}
            </Text>
          </Box>
        </Flex>

        <Flex gap={3} justify="flex-start" direction="row" align="center">
          <Link to={`/post/${post.id}`} key={post.id}>
            <h4 className={classes.heading}>{post.title}</h4>
          </Link>
        </Flex>
        <Text className={classes.summary}>
          <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
            {/* {createShortcut(
              generateHTML(JSON.parse(post.content), [
                StarterKit,
                Underline,
                TiptapLink,
                Superscript,
                SubScript,
                Highlight.configure(),
                TextAlign,
              ]),
              200
            )} */}
            <div
              dangerouslySetInnerHTML={{
                __html: generateHTML(JSON.parse(post.content), [
                  StarterKit,
                  Underline,
                  TiptapLink,
                  Superscript,
                  SubScript,
                  Highlight.configure(),
                  TextAlign,
                ]),
              }}
            ></div>
          </Spoiler>
        </Text>

        <PostMeta post={post} />
      </Box>
    </Indicator>
  );
};

export default PostItem;
