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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import AppConfig from "../config.json";
import { useAuth } from "../components/context/AuthContext";

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
  const [type, setType] = useState("login");

  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  let { form } = useParams();

  useEffect(() => {
    document.title = `Login | ${AppConfig.config.title}`;
    if (form === "2") setType("register");
    if (form === "1") setType("login");
    if (isAuthenticated()) {
      navigate(-1);
    }
  }, [isAuthenticated, form, type]);

  return (
    <Container maw="25rem" className={classes.loginBox}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500} align="center">
          Welcome to ${AppConfig.config.title}
        </Text>

        <Stack>
          {type === "login" && <LoginForm />}

          {type === "register" && <RegisterForm />}
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() =>
              type === "login" ? navigate("/login/2") : navigate("/login/1")
            }
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
