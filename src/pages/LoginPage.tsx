import { useToggle } from "@mantine/hooks";
import {
  Text,
  Paper,
  Group,
  PaperProps,
  Anchor,
  Stack,
  Container,
  createStyles,
  rem,
} from "@mantine/core";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const useStyles = createStyles(() => ({
  loginBox: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

export function LoginPage(props: PaperProps) {
  const { classes } = useStyles();
  const [type, toggle] = useToggle(["login", "register"]);

  let { path } = useParams();
  if (path === undefined) path = "/";
  const { login, signup } = useAuth(path);

  useEffect(() => {
    document.title = "Login | IT Ireland";
  });

  return (
    <Container maw="25rem" className={classes.loginBox}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500} align="center">
          Welcome to IT Ireland
        </Text>

        <Stack>
          {type === "login" && <LoginForm login={login} />}

          {type === "register" && <RegisterForm signup={signup} />}
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </Anchor>
        </Group>
      </Paper>
    </Container>
  );
}
