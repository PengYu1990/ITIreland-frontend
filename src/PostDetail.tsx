import { useLocation, useParams } from "react-router-dom";
import PostMeta from "./components/shared/PostMeta";
import usePost from "./hooks/usePost";
import { Box, createStyles, Grid, rem } from "@mantine/core";
import PublishBox from "./components/sidebar/PublishBox";
import ToTop from "./components/shared/ToTop";
import { useEffect, useMemo } from "react";
import CommentForm from "./components/forms/CommentForm";
import CommentItem from "./components/post/CommentItem";
import PostDetailSkeleton from "./components/index/PostDetailSkeleton";
import { generateHTML } from "@tiptap/react";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
// Option 2: Browser-only (lightweight)
// import { generateHTML } from '@tiptap/core'
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import TiptapLink from "@tiptap/extension-link";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

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
    color: theme.colors.dark[4],
    marginTop: rem(20),
    marginBottom: rem(30),
  },
  commentForm: {},
}));

const PostDetail = () => {
  const { classes } = useStyles();
  let { id } = useParams();
  const { data, isLoading, setData } = usePost(id);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Display Rich Text
  const output = useMemo(() => {
    if (!data || !data.content) return "";

    return generateHTML(JSON.parse(data.content), [
      Document,
      Paragraph,
      Text,
      Bold,
      StarterKit,
      Underline,
      TiptapLink,
      Superscript,
      SubScript,
      Highlight.configure(),
      TextAlign,
      CodeBlockLowlight,
      // other extensions …
    ]);
  }, [data]);

  if (!data) {
    return (
      <>
        <Grid grow>
          <Grid.Col md={9} sm={12}>
            {isLoading && <PostDetailSkeleton />}
          </Grid.Col>

          <Grid.Col md={3} sm={12}>
            <PublishBox />
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
            <div dangerouslySetInnerHTML={{ __html: output }} />
          </Box>
          <Box className={classes.detail}>
            <CommentForm
              postId={data.id}
              addComment={(comment) =>
                setData({ ...data, comments: [comment, ...data.comments] })
              }
            />
          </Box>
          {data.comments && data.comments.length != 0 && (
            <Box className={classes.detail}>
              {data.comments.map((comment, key) => (
                <CommentItem comment={comment} key={key} />
              ))}
            </Box>
          )}
        </Grid.Col>

        <Grid.Col md={3} sm={12}>
          <PublishBox />
        </Grid.Col>
      </Grid>
      <ToTop />
    </>
  );
};

export default PostDetail;
