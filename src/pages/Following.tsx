import { Grid, MediaQuery } from "@mantine/core";
import ToTop from "../components/shared/ToTop";
import HotPost from "../components/sidebar/HotPost";
import { useEffect, useState } from "react";

import AppConfig from "../config.json";
import FollowingPostList from "../components/following/FollowingPostList";
import AddPost from "../components/index/AddPost";

const Index = () => {
  useEffect(() => {
    document.title = AppConfig.config.title;
  });
  return (
    <>
      <Grid grow>
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Grid.Col span={2}></Grid.Col>
        </MediaQuery>
        <Grid.Col span={7}>
          <AddPost />
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
