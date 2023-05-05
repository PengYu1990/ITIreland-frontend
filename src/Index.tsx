import { Grid } from "@mantine/core";
import PostList from "./components/index/PostList";
import PublishBox from "./components/sidebar/PublishBox";
import ToTop from "./components/shared/ToTop";
import HotPost from "./components/sidebar/HotPost";

const Index = () => {
  return (
    <>
      <Grid grow>
        <Grid.Col md={9} sm={12}>
          <PostList />
        </Grid.Col>

        <Grid.Col md={3} sm={12}>
          <PublishBox />
          <HotPost />
        </Grid.Col>
      </Grid>
      <ToTop />
    </>
  );
};

export default Index;
