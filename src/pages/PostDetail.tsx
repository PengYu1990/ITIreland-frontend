import { useLocation, useParams } from "react-router-dom";
import PostMeta from "../components/shared/PostMeta";
import usePost from "../hooks/usePost";
import { Box, createStyles, Grid, MediaQuery, rem, Space } from "@mantine/core";
import ToTop from "../components/shared/ToTop";
import { useEffect, useMemo } from "react";
import CommentForm from "../components/forms/CommentForm";
import PostDetailSkeleton from "../components/index/PostDetailSkeleton";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import TiptapLink from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useUpdateEffect } from "react-use";
import useComments from "../hooks/useComments";
import CommentList from "../components/post/CommentList";
import AppConfig from "../config.json";
import Ad from "../components/shared/Ad";

const useStyles = createStyles((theme) => ({
  detail: {
    paddingLeft: rem(20),
    paddingRight: rem(20),
    paddingTop: rem(10),
    paddingBottom: rem(10),
    backgroundColor: "white",
    marginBottom: rem(10),
  },

  commentForm: {
    paddingLeft: rem(20),
    paddingRight: rem(20),
    backgroundColor: "white",
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
}));

const PostDetail = () => {
  const { classes } = useStyles();
  let { id } = useParams();

  if (!id) {
    return <></>;
  }
  const { data, isLoading } = usePost(id);
  const { data: comments } = useComments(parseInt(id));

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useUpdateEffect(() => {
    document.title = data?.title ? data?.title : AppConfig.config.title;
    // comments && setCommentList(comments);
  }, [data, comments]);

  // Display Rich Text
  const output = useMemo(() => {
    if (!data || !data.content) return "";

    return generateHTML(JSON.parse(data.content), [
      StarterKit,
      Underline,
      TiptapLink,
      Superscript,
      SubScript,
      Highlight.configure(),
      TextAlign,
      Image,
    ]);
  }, [data?.content]);

  return (
    <>
      <Grid grow>
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Grid.Col span={2}></Grid.Col>
        </MediaQuery>
        <Grid.Col md={7} sm={12}>
          <Box style={{ marginBottom: rem(20) }}>
            {isLoading && <PostDetailSkeleton />}
            <Box className={classes.detail}>
              <h1 className={classes.heading}>{data?.title}</h1>
              {data && (
                <PostMeta
                  post={data}
                  showComment={() => {}}
                  isShowComment={false}
                />
              )}
              <div
                className={classes.content}
                dangerouslySetInnerHTML={{ __html: output }}
              />
            </Box>
            {data?.id && <CommentForm postId={data?.id} />}
            {comments && comments.length > 0 && (
              <CommentList comments={comments} />
            )}
          </Box>
        </Grid.Col>
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Grid.Col md={3} sm={12}>
            <Ad
              src="https://www.ncirl.ie/Portals/0/Images/650x366-Cards-Teasers-Inners/img-student-at-careers-event.jpg"
              link="https://www.ncirl.ie/"
            />
            <Space h="md" />
            <Ad
              top="17rem"
              src="https://www.ncirl.ie/Portals/0/NCI%20Summer%20Camp.jpg"
              link="https://www.ncirl.ie/Events/ArtMID/6569/ArticleID/870/TY-Summer-Camp"
            />
          </Grid.Col>
        </MediaQuery>
      </Grid>
      <ToTop />
    </>
  );
};

export default PostDetail;
