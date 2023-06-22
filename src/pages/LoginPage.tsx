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

  const navigate = useNavigate();

  let { form, path } = useParams();
  if (path === undefined) path = "/";

  useEffect(() => {
    document.title = "Login | IT Ireland";
    if (form === "2") setType("register");
    if (form === "1") setType("login");
  });

  return (
    <Container maw="25rem" className={classes.loginBox}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500} align="center">
          Welcome to IT Ireland
        </Text>

        <Stack>
          {type === "login" && <LoginForm path={path} />}

          {type === "register" && <RegisterForm path={path} />}
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
