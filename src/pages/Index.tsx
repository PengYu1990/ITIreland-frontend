import { Grid, MediaQuery } from "@mantine/core";
import PostList from "../components/index/PostList";
import ToTop from "../components/shared/ToTop";
import HotPost from "../components/sidebar/HotPost";
import { useEffect, useState } from "react";

import AppConfig from "../config.json";
import Category from "../components/index/Category";
import { PostQuery } from "../hooks/usePosts";
import AddPost from "../components/index/AddPost";

const Index = () => {
  useEffect(() => {
    document.title = AppConfig.config.title;
  });

  const defaultPageSize = 10;
  const [postQuery, setPostQuery] = useState<PostQuery>({
    size: defaultPageSize,
  } as PostQuery);

  return (
    <>
      <Grid grow>
        <Grid.Col span={2}>
          <Category
            setCategory={(cate) =>
              setPostQuery({ ...postQuery, category: cate, page: 0 })
            }
            currentCategory={postQuery.category}
          />
        </Grid.Col>
        <Grid.Col span={7}>
          <AddPost />
          <PostList postQuery={postQuery} />
        </Grid.Col>
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Grid.Col span={3}>
            <HotPost />
          </Grid.Col>
        </MediaQuery>
      </Grid>
      <ToTop />
    </>
  );
};

export default Index;
