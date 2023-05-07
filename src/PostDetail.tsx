import { useLocation, useParams } from "react-router-dom";
import PostMeta from "./components/shared/PostMeta";
import usePost from "./hooks/usePost";
import { Box, createStyles, Grid, rem } from "@mantine/core";
import PublishBox from "./components/sidebar/PublishBox";
import ToTop from "./components/shared/ToTop";
import { useMemo, useState } from "react";
import CommentForm from "./components/forms/CommentForm";
import PostDetailSkeleton from "./components/index/PostDetailSkeleton";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import TiptapLink from "@tiptap/extension-link";
import { useUpdateEffect } from "react-use";
import create from "./services/http-service";
import { Comment } from "./hooks/useComments";
import CommentList from "./components/post/CommentList";
import { notifications } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  detail: {
    paddingLeft: rem(20),
    paddingRight: rem(20),
    paddingTop: rem(10),
    paddingBottom: rem(10),
    backgroundColor: "white",
    marginBottom: rem(10),
  },

  heading: {
    textDecoration: "none",
    color: theme.colors.dark[4],
    fontFamily: "Pathway Extreme",
    padding: 0,
  },
  content: {
    textDecoration: "none",
    fontFamily: `'Pathway Extreme', sans-serif;`,
    color: theme.colors.dark[7],
    marginTop: rem(20),
    marginBottom: rem(30),
  },
  commentForm: {},
}));

const PostDetail = () => {
  const { classes } = useStyles();
  let { id } = useParams();

  if (!id) {
    return <></>;
  }
  const { data, isLoading } = usePost(id);
  const [comments, setComments] = useState<Comment[]>([]);

  const { pathname } = useLocation();

  useUpdateEffect(() => {
    window.scrollTo(0, 0);
    if (data) {
      create(`/api/comments`)
        .get({ params: { postId: data.id } })
        .then((resp) => {
          setComments(resp.data.data);
          // Modify title
          document.title = data.title + " | IT Ireland";
        })
        .catch((error) => {
          notifications.show({
            title: "Notification",
            message: error.message,
            color: "red",
          });
        });
    }
  }, [pathname, data]);

  // Display Rich Text
  const output = useMemo(() => {
    if (!data || !data.content) return "";

    return generateHTML(JSON.parse(data.content), [
      // Document,
      // Paragraph,
      // Text,
      // Bold,
      StarterKit,
      Underline,
      TiptapLink,
      Superscript,
      SubScript,
      Highlight.configure(),
      TextAlign,
      // CodeBlockLowlight,
      // other extensions …
    ]);
  }, [data?.content]);

  if (!data) {
    return (
      <>
        <Grid grow>
          <Grid.Col md={9} sm={12}>
            {isLoading && <PostDetailSkeleton />}
          </Grid.Col>

          <Grid.Col md={3} sm={12}>
            <PublishBox />
            {/* <HotPost /> */}
          </Grid.Col>
        </Grid>
        <ToTop />
      </>
    );
  }

  return (
    <>
      <Grid grow>
        <Grid.Col md={9} sm={12}>
          {isLoading && <PostDetailSkeleton />}
          <Box className={classes.detail}>
            <h1 className={classes.heading}>{data.title}</h1>
            <PostMeta post={data} />
            <div
              className={classes.content}
              dangerouslySetInnerHTML={{ __html: output }}
            />
          </Box>
          <Box className={classes.detail}>
            <CommentForm
              postId={data.id}
              addComment={(comment) => setComments([comment, ...comments])}
            />
          </Box>
          <CommentList setComments={setComments} comments={comments} />
        </Grid.Col>

        <Grid.Col md={3} sm={12}>
          <PublishBox />
          {/* <HotPost /> */}
        </Grid.Col>
      </Grid>
      <ToTop />
    </>
  );
};

export default PostDetail;
