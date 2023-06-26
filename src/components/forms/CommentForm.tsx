import {
  Avatar,
  Button,
  Flex,
  Textarea,
  createStyles,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import APIClient from "../../services/http-service";
import { Comment } from "../../services/comment-service";
import { useMediaQuery } from "@mantine/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef } from "react";
import AppConfig from "../../config.json";

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
  parentId?: number;
  rows?: number;
  focus?: boolean;
  onSubmited?: () => void;
  onTextAreaBlur?: () => void;
}

const CommentSection = ({
  postId,
  parentId,
  onSubmited,
  rows,
  focus,
  onTextAreaBlur,
}: Props) => {
  const { classes } = useStyles();

  const { user } = useAuth();

  const matches = useMediaQuery("(max-width: 600px)");

  const textArea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (focus && textArea.current) {
      textArea.current.focus();
    }
  }, [focus]);

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

    const comment = {
      ...values,
      postId: postId,
      userId: user.id,
      parentId: parentId,
    };
    saveComment.mutate(comment);
  };

  const queryClient = useQueryClient();

  const saveComment = useMutation<Comment, Error, Comment>({
    mutationFn: (comment: Comment) =>
      APIClient<Comment>("/api/comments").post(comment),
    onSuccess: () => {
      queryClient.invalidateQueries([postId, "comments"]);
      onSubmited && onSubmited();
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
        <Avatar
          src={
            user &&
            user.headShotUrl &&
            `${AppConfig.config.api}${user.headShotUrl}`
          }
          color="cyan"
          radius="xl"
          size={35}
        >
          {user && user.username.substring(0, 2).toUpperCase()}
        </Avatar>
        <Textarea
          className={classes.editor}
          minRows={rows ? rows : 3}
          w="100%"
          disabled={user === null}
          placeholder={user === null ? "Login and comment" : "Enter comment"}
          {...form.getInputProps("content")}
          ref={textArea}
          onBlur={() =>
            form.values.content === "" && onTextAreaBlur && onTextAreaBlur()
          }
        ></Textarea>
      </Flex>
      <Button
        type="submit"
        disabled={user === null || form.values.content === ""}
        className={classes.button}
      >
        Submit
      </Button>
    </form>
  );
};

export default CommentSection;
