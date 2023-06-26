import { Box, Grid, MediaQuery } from "@mantine/core";
import PublishBox from "../components/sidebar/PublishBox";
import HotPost from "../components/sidebar/HotPost";
import ToTop from "../components/shared/ToTop";
import Profile from "../components/shared/Profile";
import { useLocation, useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import { useEffect } from "react";

const UserDetail = () => {
  const { id } = useParams();
  if (!id) {
    return <></>;
  }
  const onSuccess = () => {
    document.title = `${user?.username} - Profile - IT Ireland`;
  };

  const { data: user } = useUser(id, onSuccess);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
