import { Box, Grid, MediaQuery } from "@mantine/core";
import HotPost from "../components/sidebar/HotPost";
import ToTop from "../components/shared/ToTop";
import Profile from "../components/shared/Profile";
import { useLocation, useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import { useEffect } from "react";
import AppConfig from "../config.json";
import { User } from "../services/user-service";
import Ad from "../components/shared/ad";

const UserDetail = () => {
  const { id } = useParams();
  if (!id) {
    return <></>;
  }
  const onSuccess = (u: User) => {
    document.title = `${u.username} - Profile -  ${AppConfig.config.title}`;
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
            <Ad
              src="https://www.ncirl.ie/Portals/0/Images/650x366-Cards-Teasers-Inners/img-student-at-careers-event.jpg"
              link="https://www.ncirl.ie/"
            />
          </Grid.Col>
        </MediaQuery>
      </Grid>
      <ToTop />
    </>
  );
};

export default UserDetail;
