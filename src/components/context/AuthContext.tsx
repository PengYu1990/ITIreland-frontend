import { useContext, useEffect, useState } from "react";
import {
  getSessionUser,
  removeSessionUser,
  setSessionUser,
} from "../../services/session-service";
import { notifications } from "@mantine/notifications";
import APIClient from "../../services/http-service";
import { User } from "../../services/user-service";
import React from "react";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AuthContextProps {
  isAuthenticated: () => boolean;
  login: (values: User) => void;
  signup: (values: User) => void;
  logout: () => void;
  user: User | null;
}

const AuthContext = React.createContext({} as AuthContextProps);
const AuthProvider = ({ children }: any) => {
  // Check if user is authenticated

  // User state
  const [user, setUser] = useState<User | null>(null);

  // Update user state
  useEffect(() => {
    setUser(isAuthenticated() ? getSessionUser() : null);
  }, []);

  // Check if user is authenticated
  const isAuthenticated = () => {
    const user = getSessionUser();
    const token = user?.token;
    if (token === null || token === undefined) return false;
    const { exp } = jwt_decode<JwtPayload>(token);
    if (exp && Date.now() >= exp * 1000) {
      notifications.show({
        title: "Notification",
        message: "Session Expired",
        color: "blue",
      });
      logout();
      return false;
    }
    return true;
  };

  // Query client
  const queryClient = useQueryClient();

  // Login
  const login = (values: User) => {
    handleLogin.mutate(values);
  };

  // Login mutation
  const handleLogin = useMutation({
    mutationKey: ["logined_user", user?.id],
    mutationFn: (values: User) =>
      APIClient<User>("/api/auth/login").post(values),
    onSuccess: (user: User) => {
      queryClient.invalidateQueries(["logined_user", user?.id]);
      setSessionUser(user);
      setUser(user);
      notifications.show({
        title: "Notification",
        message: "Login Success",
        color: "blue",
      });
      // TODO: Fix this
      window.history.go(-1);
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Notification",
        message: error.message,
        color: "red",
      });
    },
  });

  // signups
  const signup = (values: User) => {
    handleSignUp.mutate(values);
  };

  // Sign up mutation
  const handleSignUp = useMutation({
    mutationKey: ["logined_user", user?.id],
    mutationFn: (values: User) =>
      APIClient<User>("/api/auth/signup").post(values),
    onSuccess: (user: User) => {
      queryClient.invalidateQueries(["logined_user", user?.id]);
      setSessionUser(user);
      setUser(user);
      notifications.show({
        title: "Notification",
        message: "Sign Up Success",
        color: "blue",
      });
      // TODO: Fix this
      window.history.go(-1);
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Notification",
        message: error.message,
        color: "red",
      });
    },
  });

  // Logout
  const logout = () => {
    // handleLogout.mutate();
    removeSessionUser();
    setUser(null);
    notifications.show({
      title: "Notification",
      message: "Logout Success",
      color: "blue",
    });
    notifications.show({
      title: "Notification",
      message: "Logout Success",
      color: "blue",
    });
  };

  // Logout mutation
  // const handleLogout = useMutation({
  //   mutationFn: () => APIClient<null>("/api/auth/logout").post(null),
  //   onSuccess: () => {
  //     removeSessionUser();
  //     setUser(null);
  //     notifications.show({
  //       title: "Notification",
  //       message: "Logout Success",
  //       color: "blue",
  //     });
  //     notifications.show({
  //       title: "Notification",
  //       message: "Logout Success",
  //       color: "blue",
  //     });
  //     // TODO: Fix this
  //     window.history.go(-1);
  //   },
  //   onError: (error: Error) => {
  //     notifications.show({
  //       title: "Notification",
  //       message: error.message,
  //       color: "red",
  //     });
  //   },
  // });

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
