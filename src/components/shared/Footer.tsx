import {
  createStyles,
  Container,
  Group,
  ActionIcon,
  rem,
  Anchor,
  Box,
} from "@mantine/core";
import { IconBrandInstagram, IconBrandLinkedin } from "@tabler/icons-react";
import { Image, Text } from "@mantine/core";
import logo from "../../assets/logo.png";

import AppConfig from "../../config.json";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(10),
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export function Footer() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Image src={logo} alt={AppConfig.config.title} mah={45} maw={200} />

        <Box>
          <Group spacing={0} className={classes.links} position="right" noWrap>
            <Anchor
              href="https://www.linkedin.com/in/pengyu-hugo"
              target="_blank"
            >
              <ActionIcon size="lg">
                <IconBrandLinkedin size="1.05rem" stroke={1.5} />
              </ActionIcon>
            </Anchor>
            <Anchor
              href="https://www.instagram.com/hugo_glance/"
              target="_blank"
            >
              <ActionIcon size="lg">
                <IconBrandInstagram size="1.05rem" stroke={1.5} />
              </ActionIcon>
            </Anchor>
            {/* <ActionIcon size="lg">
              <IconBrandYoutube size="1.05rem" stroke={1.5} />
            </ActionIcon> */}
          </Group>
          <Box>
            <Text style={{ fontSize: 14 }}>
              © 2023 {AppConfig.config.title} Developed By{" "}
              <Anchor
                href="https://www.linkedin.com/in/pengyu-hugo"
                target="_blank"
              >
                Peng Yu
              </Anchor>
            </Text>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
