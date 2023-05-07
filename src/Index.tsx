import { Grid } from "@mantine/core";
import PostList from "./components/index/PostList";
import PublishBox from "./components/sidebar/PublishBox";
import ToTop from "./components/shared/ToTop";

const Index = () => {
  return (
    <>
      <Grid grow>
        <Grid.Col sm={9} xs={12}>
          <PostList />
        </Grid.Col>

        <Grid.Col sm={3} xs={12}>
          <PublishBox />
          {/* <HotPost /> */}
        </Grid.Col>
      </Grid>
      <ToTop />
    </>
  );
};

export default Index;
