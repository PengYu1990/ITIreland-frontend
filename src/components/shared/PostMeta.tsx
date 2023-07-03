import {
  Button,
  Flex,
  Group,
  MediaQuery,
  Text,
  createStyles,
  rem,
} from "@mantine/core";
import {
  IconCategory,
  IconEye,
  IconMessage,
  IconTags,
  IconThumbDown,
  IconThumbUp,
} from "@tabler/icons-react";
import { Post } from "../../services/post-service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import APIClient, { Response } from "../../services/http-service";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  meta: {
    marginTop: rem(20),
    color: theme.colors.gray[6],
    fontSize: rem(14),
  },
  upvote: {
    color: theme.colors.dark[6],
    fontSize: rem(14),
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: rem(20),
    borderTopLeftRadius: rem(20),
    padding: rem(2),
    paddingLeft: rem(10),
    paddingRight: rem(10),
    borderTop: `${rem(2)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    borderBottom: `${rem(2)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    borderLeft: `${rem(2)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    marginRight: 0,
  },

  downvote: {
    color: theme.colors.dark[6],
    fontSize: rem(14),
    borderTopRightRadius: rem(20),
    borderBottomRightRadius: rem(20),
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    padding: rem(2),
    paddingLeft: rem(10),
    paddingRight: rem(10),
    borderTop: `${rem(2)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    borderBottom: `${rem(2)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    borderRight: `${rem(2)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    marginLeft: 0,
  },
  btn: {
    padding: rem(2),
    borderRadius: rem(20),
  },
}));

interface Props {
  post: Post;
}

const PostMeta = ({ post }: Props) => {
  const { classes } = useStyles();

  const [isUpvoted, setIsUpvoted] = useState(post.upvoted);
  const [downvoted, setDownvoted] = useState(post.downvoted);

  const upvote = useMutation<number, AxiosError<Response<number>>, number>({
    mutationKey: ["upvote", post.id],
    mutationFn: (postId) =>
      APIClient<number>(
        `/posts/${isUpvoted ? "unUpvote" : "upvote"}/${postId}`
      ).get(),
    onSuccess: (data) => {
      console.log(data);
      post.upvotes = data;
      setIsUpvoted(isUpvoted ? false : true);
    },
    onError: (error) => {
      notifications.show({
        title: "Notification",
        message: error.response?.data.message,
        color: "red",
      });
    },
  });

  const downvote = useMutation<number, AxiosError<Response<number>>, number>({
    mutationKey: ["downvote", post.id],
    mutationFn: (postId) =>
      APIClient<number>(
        `/posts/${downvoted ? "unDownvote" : "downvote"}/${postId}`
      ).get(),
    onSuccess: (data) => {
      console.log(data);
      post.downvotes = data;
      setDownvoted(downvoted ? false : true);
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
    <Flex
      className={classes.meta}
      gap={25}
      justify="flex-start"
      direction="row"
    >
      <Group spacing="-1" position="left">
        <Button
          className={classes.upvote}
          styles={(theme) => ({
            leftIcon: {
              color: isUpvoted ? theme.colors.blue : "gray",
            },
          })}
          variant="light"
          color="gray"
          leftIcon={<IconThumbUp size={20} />}
          onClick={() => upvote.mutate(post.id)}
          // disabled={isUpvoted}
        >
          Upvote · <Text ml={3}>{post.upvotes}</Text>
        </Button>
        <Button
          className={classes.downvote}
          variant="light"
          color="gray"
          styles={(theme) => ({
            leftIcon: {
              color: downvoted ? theme.colors.blue : "gray",
            },
          })}
          leftIcon={<IconThumbDown size={20} />}
          onClick={() => downvote.mutate(post.id)}
        >
          <Text ml={3}>{post.downvotes}</Text>
        </Button>
      </Group>

      <Button
        variant="light"
        color="gray"
        leftIcon={<IconMessage size={20} spacing={0} />}
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
        <Text ml={3}>{post.commentCount}</Text>
      </Button>

      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <Group spacing="xs" position="left">
          <IconEye size={20} />
          <Text>{post.views}</Text>
        </Group>
      </MediaQuery>

      <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
        <Group spacing="xs" position="left">
          <IconCategory size={20} />
          <Text>{post.category}</Text>
        </Group>
      </MediaQuery>

      {post.tags.length > 0 && (
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Group spacing="xs" position="left">
            <IconTags size={25} />
            <Flex gap={10} justify="flex-start" direction="row">
              {post.tags.map((tag, key) => (
                <Text key={key}>{tag.tag}</Text>
              ))}
            </Flex>
          </Group>
        </MediaQuery>
      )}
    </Flex>
  );
};

export default PostMeta;
