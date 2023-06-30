import {
  Header,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  createStyles,
  Avatar,
  Menu,
  Image,
  Text,
  Container,
  Tooltip,
  Flex,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconEdit,
  IconHome,
  IconLogout,
  IconNotebook,
  IconUser,
} from "@tabler/icons-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import AppConfig from "../../config.json";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  container: {
    paddingTop: rem(5),
    paddingBottom: 0,
  },
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  linkActive: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
    borderBottom: `${rem(3)} solid ${theme.colors.blue[6]}`,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },
  dropdownHeader: {
    paddingLeft: `${theme.spacing.md}`,
    paddingRight: `${theme.spacing.md}`,
    paddingTop: `${theme.spacing.md}`,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  username: {
    fontSize: rem(18),
    fontFamily: `'Open Sans', sans-serif`,
    marginTop: rem(5),
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
  navActive: {
    color: theme.colors.blue[6],
  },
  navNormal: {
    color: theme.colors.dark[3],
  },
}));

export function NavBar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const { classes, theme } = useStyles();
  const { user, logout } = useAuth();
  const [nav, setNav] = useState(0);
  const [homeToolTipOpened, setHomeToolTipOpened] = useState(false);
  const [followToolTipOpened, setFollowToolTipOpened] = useState(false);
  const [postToolTipOpened, setPostToolTipOpened] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  const clickLogin = () => {
    navigate("/login/1");
    toggleDrawer();
  };

  const clickSignUp = () => {
    navigate("/login/2");
    toggleDrawer();
  };

  const clickLogout = () => {
    logout();
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setNav(0);
    } else if (location.pathname === "/following") {
      setNav(1);
    } else if (location.pathname === "/edit") {
      setNav(2);
    }
  }, [location.pathname]);

  const toProfile = () => {
    navigate(`/user/${user?.id}`);
  };

  return (
    <Box>
      <Header height={60} px="md">
        <Container className={classes.container} size="lg">
          <Group position="apart" sx={{ height: "100%" }}>
            <Group>
              <Link to="/">
                <Image
                  src={logo}
                  alt={AppConfig.config.title}
                  mah={45}
                  maw={150}
                />
              </Link>

              <Group
                sx={{ height: "100%" }}
                spacing={0}
                className={classes.hiddenMobile}
                position="left"
                ml={20}
              >
                <Tooltip label="Home" opened={homeToolTipOpened} color="gray">
                  <Link
                    to="/"
                    onClick={() => setNav(0)}
                    about="Home"
                    className={nav === 0 ? classes.linkActive : classes.link}
                    onMouseEnter={() => setHomeToolTipOpened(true)}
                    onMouseLeave={() => setHomeToolTipOpened(false)}
                  >
                    <IconHome
                      size={30}
                      className={
                        nav === 0 ? classes.navActive : classes.navNormal
                      }
                    />
                  </Link>
                </Tooltip>
                <Tooltip
                  label="Following"
                  opened={followToolTipOpened}
                  color="gray"
                >
                  <Link
                    onClick={() => setNav(1)}
                    to="/following"
                    className={nav === 1 ? classes.linkActive : classes.link}
                    onMouseEnter={() => setFollowToolTipOpened(true)}
                    onMouseLeave={() => setFollowToolTipOpened(false)}
                  >
                    <IconNotebook
                      size={30}
                      className={
                        nav === 1 ? classes.navActive : classes.navNormal
                      }
                    />
                  </Link>
                </Tooltip>
                <Tooltip label="Post" opened={postToolTipOpened} color="gray">
                  <Link
                    to="/edit"
                    onClick={() => setNav(2)}
                    className={nav === 2 ? classes.linkActive : classes.link}
                    onMouseEnter={() => setPostToolTipOpened(true)}
                    onMouseLeave={() => setPostToolTipOpened(false)}
                  >
                    <IconEdit
                      size={30}
                      className={
                        nav === 2 ? classes.navActive : classes.navNormal
                      }
                    />
                  </Link>
                </Tooltip>
              </Group>
            </Group>
            {user ? (
              <Group className={classes.hiddenMobile}>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Link to="#">
                      <Avatar
                        src={
                          user &&
                          user.headShotUrl &&
                          `${AppConfig.config.api}${user.headShotUrl}`
                        }
                        color="cyan"
                        radius="xl"
                        size={35}
                      >
                        {user.username.substring(0, 2).toUpperCase()}
                      </Avatar>
                    </Link>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Link to={`/user/${user.id}`}>
                      <Box className={classes.dropdownHeader}>
                        <Avatar
                          src={
                            user &&
                            user.headShotUrl &&
                            `${AppConfig.config.api}${user.headShotUrl}`
                          }
                          color="cyan"
                          radius="xl"
                          size={80}
                        >
                          <Text>
                            {user.username.substring(0, 2).toUpperCase()}
                          </Text>
                        </Avatar>
                        <Flex justify="space-between" align="center">
                          <Text className={classes.username}>
                            {user.username}
                          </Text>
                          <IconUser size={18} />
                        </Flex>
                      </Box>
                    </Link>
                    <Divider my="sm" variant="dashed" />
                    <Menu.Label>Account</Menu.Label>
                    <Menu.Item
                      icon={<IconUser size={14} />}
                      onClick={toProfile}
                    >
                      Profile
                    </Menu.Item>
                    <Menu.Item
                      icon={<IconLogout size={14} />}
                      onClick={clickLogout}
                    >
                      Log out
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            ) : (
              <Group className={classes.hiddenMobile}>
                <Link to="/login/1" className={classes.link}>
                  <Button>Log in</Button>
                </Link>
                <Link to="/login/2" className={classes.link}>
                  <Button variant="default">Sign Up</Button>
                </Link>
              </Group>
            )}

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
            />
          </Group>
        </Container>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Link to="/" className={classes.link}>
            Home
          </Link>
          <Link to="/following" className={classes.link}>
            Following
          </Link>

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="center" grow pb="xl" px="md">
            {user ? (
              <Button onClick={clickLogout}>Log out</Button>
            ) : (
              <>
                <Button variant="default" onClick={clickLogin}>
                  Log in
                </Button>
                <Button onClick={clickSignUp}>Sign up</Button>
              </>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
