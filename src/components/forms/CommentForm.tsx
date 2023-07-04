import {
  Avatar,
  Button,
  Flex,
  TextInput,
  createStyles,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import APIClient, { Response } from "../../services/http-service";
import { Comment } from "../../services/comment-service";
import { useMediaQuery } from "@mantine/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef } from "react";
import AppConfig from "../../config.json";
import { AxiosError } from "axios";

const useStyles = createStyles((theme) => ({
  form: {
    padding: rem(10),
    border: `${rem(1)} solid ${theme.colors.gray[2]}`,
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
  focus,
  onTextAreaBlur,
}: Props) => {
  const { classes } = useStyles();

  const { user } = useAuth();

  const matches = useMediaQuery("(max-width: 600px)");

  const textInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focus && textInput.current) {
      textInput.current.focus();
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

  const saveComment = useMutation<Comment, AxiosError<Response<null>>, Comment>(
    {
      mutationFn: (comment: Comment) =>
        APIClient<Comment>("/comments").post(comment),
      onSuccess: () => {
        queryClient.invalidateQueries([postId, "comments"]);
        onSubmited && onSubmited();
        form.reset();
      },
      onError: (error) => {
        notifications.show({
          title: "Notification",
          message: error.response?.data.message,
          color: "red",
        });
      },
    }
  );

  return (
    <form
      className={matches ? classes.formMobile : classes.form}
      onSubmit={form.onSubmit((values) => submitComment(values))}
    >
      <Flex justify="space-between" direction="row" align="center">
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
        <TextInput
          className={classes.editor}
          w="100%"
          disabled={user === null}
          placeholder={user === null ? "Login and comment" : "Enter comment"}
          {...form.getInputProps("content")}
          ref={textInput}
          onBlur={() =>
            form.values.content === "" && onTextAreaBlur && onTextAreaBlur()
          }
        ></TextInput>
        <Button
          type="submit"
          style={{ marginLeft: rem(10) }}
          variant="outline"
          disabled={user === null || form.values.content === ""}
        >
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default CommentSection;
