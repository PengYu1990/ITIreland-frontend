import { Box, Grid, MediaQuery } from "@mantine/core";
import PublishBox from "./components/sidebar/PublishBox";
import HotPost from "./components/sidebar/HotPost";
import ToTop from "./components/shared/ToTop";

const UserDetail = () => {
  return (
    <>
      <Box></Box>
      <Grid grow>
        <Grid.Col md={9} sm={12}></Grid.Col>
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Grid.Col md={3} sm={12}>
            <PublishBox />
            <HotPost />
          </Grid.Col>
        </MediaQuery>
      </Grid>
      <ToTop />
    </>
  );
};

export default UserDetail;
