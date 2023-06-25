import {
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Menu,
  Text,
  createStyles,
  rem,
} from "@mantine/core";
import { Comment } from "../../services/comment-service";
import dayjs from "dayjs";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import APIClient, { Response } from "../../services/http-service";
import { notifications } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import CommentForm from "../forms/CommentForm";
import { useState } from "react";
import CommentList from "./CommentList";
import { useUpdateEffect } from "react-use";

interface Props {
  comment: Comment;
}

const useStyles = createStyles((theme) => ({
  citem: {
    // marginTop: rem(20),
    fontSize: rem(14),
    paddingTop: rem(10),
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
  usename: {
    color: theme.colors.dark[2],
    fontWeight: "bolder",
  },
  content: {
    color: theme.colors.dark[6],
    marginTop: rem(10),
  },
  time: {
    marginTop: rem(15),
    color: theme.colors.gray[6],
  },
}));

const CommentItem = ({ comment }: Props) => {
  const { classes } = useStyles();
  const { user } = useAuth();
  const [replyId, setReplyId] = useState<number | undefined>(undefined);
  const [childrenComments, setChildrenComments] = useState<Comment[]>(
    comment.childrenComments
  );

  useUpdateEffect(() => {
    // comments && setCommentList(comments);
    setChildrenComments(comment.childrenComments);
  }, [comment.childrenComments]);

  const queryClient = useQueryClient();

  const del = () => {
    delComment.mutate(comment);
  };

  const delComment = useMutation<Response<null>, Error, Comment>({
    mutationFn: (comment: Comment) =>
      APIClient<Comment>("/api/comments").delete(comment),
    onSuccess: () =>
      queryClient.invalidateQueries([comment.postId, "comments"]),
    onError: (error) => {
      notifications.show({
        title: "Notification",
        message: error.message,
        color: "red",
      });
    },
  });

  return (
    <Flex
      className={classes.citem}
      gap={10}
      justify="flex-start"
      direction="row"
    >
      <Avatar color="cyan" radius="xl" size={30}>
        {comment.user.username.substring(0, 2).toUpperCase()}
      </Avatar>
      <Box w="100%">
        <Text className={classes.usename}>{comment.user.username}</Text>
        <Text className={classes.content}>{comment.content}</Text>
        <Flex
          className={classes.time}
          gap={10}
          align="center"
          justify="space-between"
          direction="row"
        >
          <Text>{dayjs(comment.utime).fromNow()}</Text>
          <Group>
            {user && (
              <Flex gap={2} justify="flex-start" direction="row" align="center">
                <Button
                  variant="subtle"
                  p={0}
                  ml={0}
                  leftIcon={<BiCommentDetail size={16} />}
                  styles={() => ({
                    leftIcon: {
                      marginRight: 0,
                    },
                  })}
                  onClick={() => {
                    return replyId === comment.id
                      ? setReplyId(undefined)
                      : setReplyId(comment.id);
                  }}
                >
                  {replyId ? "Cancle" : "Reply"}
                </Button>
              </Flex>
            )}
            {user && user.id === comment.user.id && (
              <Flex gap={2} justify="flex-start" direction="row" align="center">
                <Menu shadow="md">
                  <Menu.Target>
                    <Button
                      variant="subtle"
                      p={0}
                      ml={0}
                      leftIcon={<AiOutlineDelete size={18} />}
                      styles={() => ({
                        root: {
                          color: "red",
                          fontWeight: "normal",
                        },
                        leftIcon: {
                          marginRight: 0,
                        },
                      })}
                    >
                      Delete
                    </Button>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      color="red"
                      icon={<IconTrash size={14} />}
                      onClick={del}
                    >
                      Delete?
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Flex>
            )}
          </Group>
        </Flex>
        <CommentList comments={childrenComments} />
        {replyId == comment.id && (
          <CommentForm postId={comment.postId} parentId={comment.id} />
        )}
      </Box>
    </Flex>
  );
};

export default CommentItem;
