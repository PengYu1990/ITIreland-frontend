import { Footer } from "./components/shared/Footer";
import "./App.css";
import { NavBar } from "./components/shared/NavBar";

import { AppShell, Container, createStyles, rem } from "@mantine/core";
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

  const matches = useMediaQuery("(max-width: 600px)");

  return (
    <>
      <AppShell header={<NavBar />} zIndex={10000} padding={0}>
        <Container
          className={matches ? classes.contentMobile : classes.content}
          size="lg"
        >
          <Outlet />
        </Container>
        <Footer />
      </AppShell>
      <Analytics />
    </>
  );
}
