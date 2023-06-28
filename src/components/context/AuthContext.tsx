import { useContext, useEffect, useState } from "react";
import {
  getSessionUser,
  removeSessionUser,
  setSessionUser,
} from "../../services/session-service";
import { notifications } from "@mantine/notifications";
import APIClient, { Response } from "../../services/http-service";
import { User } from "../../services/user-service";
import React from "react";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  const handleLogin = useMutation({
    mutationKey: ["logined_user", user?.id],
    mutationFn: (values: User) =>
      APIClient<User>("/api/auth/login").post(values),
    onSuccess: (user: User) => {
      queryClient.invalidateQueries(["logined_user", user?.id]),
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

  // Request login api
  const login = (values: User) => {
    handleLogin.mutate(values);
    // APIClient<User>("/api/auth/login")
    //   .post(values)
    //   .then((user) => {
    //     setSessionUser(user);
    //     setUser(user);
    //     notifications.show({
    //       title: "Notification",
    //       message: "Login Success",
    //       color: "blue",
    //     });
    //     // TODO: Fix this
    //     window.history.go(-1);
    //   })
    //   .catch((error) => {
    //     notifications.show({
    //       title: "Notification",
    //       message: error.response.data.message,
    //       color: "red",
    //     });
    //   });
  };

  // Request sign up api
  const signup = (values: User) => {
    console.log(values);
    APIClient<User>("/api/auth/signup")
      .post(values)
      .then((user) => {
        setSessionUser(user);
        setUser(user);
        notifications.show({
          title: "Notification",
          message: "Sign Up Success",
          color: "blue",
        });
        // TODO: Fix this
        window.history.go(-1);
      })
      .catch((error) => {
        notifications.show({
          title: "Notification",
          message: error.response.data.message,
          color: "red",
        });
      });
  };

  const logout = () => {
    APIClient("/api/auth/logout")
      .post(null)
      .then(() => {
        removeSessionUser();
        setUser(null);
        notifications.show({
          title: "Notification",
          message: "Logout Success",
          color: "blue",
        });
      })
      .catch(() => {
        removeSessionUser();
        setUser(null);
        notifications.show({
          title: "Notification",
          message: "Logout Success",
          color: "blue",
        });
      });
  };

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
