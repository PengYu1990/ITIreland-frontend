import { Divider, Grid, Image, MediaQuery, Space } from "@mantine/core";
import PostList from "../components/index/PostList";
import ToTop from "../components/shared/ToTop";
import HotPost from "../components/sidebar/HotPost";
import { useEffect, useState } from "react";

import AppConfig from "../config.json";
import Category from "../components/shared/Category";
import { PostQuery } from "../hooks/usePosts";
import AddPost from "../components/shared/AddPost";
import Ad from "../components/shared/ad";

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
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Grid.Col span={2}>
            <Category
              setCategory={(cate) =>
                setPostQuery({ ...postQuery, category: cate, page: 0 })
              }
              currentCategory={postQuery.category}
            />
          </Grid.Col>
        </MediaQuery>
        <Grid.Col span={7}>
          <AddPost />
          <PostList postQuery={postQuery} />
        </Grid.Col>
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Grid.Col span={3}>
            <Ad
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

export default Index;
