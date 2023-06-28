import { Grid, MediaQuery } from "@mantine/core";
import PostList from "../components/index/PostList";
import PublishBox from "../components/sidebar/PublishBox";
import ToTop from "../components/shared/ToTop";
import HotPost from "../components/sidebar/HotPost";
import { useEffect } from "react";

import AppConfig from "../config.json";
import FollowingPostList from "../components/following/FollowingPostList";

const Index = () => {
  useEffect(() => {
    document.title = AppConfig.config.title;
  });
  return (
    <>
      <Grid grow>
        <Grid.Col span={9}>
          <FollowingPostList />
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
