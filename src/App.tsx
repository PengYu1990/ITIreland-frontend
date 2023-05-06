import { Footer } from "./components/shared/Footer";
import "./App.css";
import { NavBar } from "./components/shared/NavBar";

import { AppShell, Container, createStyles, rem } from "@mantine/core";
import RegisterModal from "./components/shared/Modal";
import RegisterForm from "./components/forms/RegisterForm";
import LoginForm from "./components/forms/LoginForm";
import useAuth from "./hooks/useAuth";
import { Outlet } from "react-router-dom";
import { createContext } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { Analytics } from "@vercel/analytics/react";

const useStyles = createStyles((theme) => ({
  contentMobile: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: 0,
  },
  content: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    backgroundColor: "#f2f2f2",
  },
}));

export const AuthContext = createContext("auth");

export default function App() {
  const { classes } = useStyles();
  const {
    opened,
    close,
    isLogin,
    openLoginModal,
    openSignUpModal,
    login,
    signup,
    loginState,
    logout,
  } = useAuth();

  const matches = useMediaQuery("(max-width: 600px)");

  return (
    <AuthContext.Provider value={loginState}>
      <AppShell
        header={
          <NavBar
            onLoginClicked={openLoginModal}
            onSignUpClicked={openSignUpModal}
            onLogoutClicked={logout}
          />
        }
        padding={0}
      >
        <Container
          className={matches ? classes.contentMobile : classes.content}
          size={1280}
        >
          <Outlet />
        </Container>
        <Footer />
      </AppShell>
      <RegisterModal
        opened={opened}
        close={close}
        title={isLogin ? "Log in" : "Sign up"}
      >
        {isLogin ? (
          <LoginForm login={login} />
        ) : (
          <RegisterForm signup={signup} />
        )}
      </RegisterModal>
      <Analytics />
    </AuthContext.Provider>
  );
}
