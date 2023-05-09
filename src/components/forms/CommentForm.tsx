import {
  Avatar,
  Button,
  Flex,
  Textarea,
  createStyles,
  rem,
} from "@mantine/core";
import { useContext } from "react";
import { getSessionUser } from "../../services/session-service";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import APIClient from "../../services/http-service";
import { Comment } from "../../services/comment-service";
import { AuthContext } from "../../App";
import { useMediaQuery } from "@mantine/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useStyles = createStyles((theme) => ({
  form: {
    paddingTop: rem(10),
    paddingBottom: rem(55),
  },
  formMobile: {
    paddingTop: rem(20),
    paddingBottom: rem(55),
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
  button: {
    marginTop: rem(10),
    float: "right",
  },
  editor: {
    marginLeft: rem(10),
  },
}));

interface Props {
  postId: number;
  // addComment: (comment: Comment) => void;
}

const CommentSection = ({ postId }: Props) => {
  const { classes } = useStyles();
  const user = getSessionUser();

  const loginState = useContext(AuthContext);

  const matches = useMediaQuery("(max-width: 600px)");

  const form = useForm({
    initialValues: {
      content: "",
    },

    validate: {
      content: (value) =>
        value.length < 1 ? "Comment can not be empty" : null,
    },
  });

  const submitComment = (values: any) => {
    const user = getSessionUser();
    if (user === null) {
      notifications.show({
        title: "Notification",
        message: "You need to login before comment",
        color: "red",
      });

      return;
    }

    if (postId == null) {
      return;
    }

    const comment = { ...values, postId: postId, userId: user.id };

    saveComment.mutate(comment);
  };

  const queryClient = useQueryClient();

  const saveComment = useMutation<Comment, Error, Comment>({
    mutationFn: (comment: Comment) =>
      APIClient<Comment>("/api/comments").post(comment),
    onSuccess: () => {
      queryClient.invalidateQueries([postId, "comments"]);
      form.reset();
    },
    onError: (error) => {
      notifications.show({
        title: "Notification",
        message: error.message,
        color: "red",
      });
    },
  });

  return (
    <form
      className={matches ? classes.formMobile : classes.form}
      onSubmit={form.onSubmit((values) => submitComment(values))}
    >
      <Flex justify="space-between" direction="row">
        <Avatar color="cyan" radius="xl" size={35}>
          {user && user.username.substring(0, 2).toUpperCase()}
        </Avatar>
        <Textarea
          className={classes.editor}
          minRows={3}
          w="100%"
          disabled={loginState === "no"}
          placeholder={
            loginState === "no" ? "Login and comment" : "Enter comment"
          }
          {...form.getInputProps("content")}
        ></Textarea>
      </Flex>
      <Button
        type="submit"
        disabled={loginState === "no"}
        className={classes.button}
      >
        Submit
      </Button>
    </form>
  );
};

export default CommentSection;
