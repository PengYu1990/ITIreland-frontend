import { Box, Grid, MediaQuery } from "@mantine/core";
import PublishBox from "../components/sidebar/PublishBox";
import HotPost from "../components/sidebar/HotPost";
import ToTop from "../components/shared/ToTop";
import Profile from "../components/shared/Profile";
import { useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import usePosts from "../hooks/usePosts";

const UserDetail = () => {
  const { id } = useParams();
  if (!id) {
    return <></>;
  }
  const { data: user } = useUser(id);

  return (
    <>
      <Box></Box>
      <Grid grow>
        <Grid.Col md={9} sm={12}>
          {user && <Profile user={user} />}
        </Grid.Col>
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
