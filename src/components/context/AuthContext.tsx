import { useContext, useState } from "react";
import {
  getSessionUser,
  removeSessionUser,
  setSessionUser,
} from "../../services/session-service";
import { notifications } from "@mantine/notifications";
import APIClient from "../../services/http-service";
import { User } from "../../services/user-service";
import React from "react";
import { useJwt } from "react-jwt";

interface AuthContextProps {
  isLogedin: boolean;
  login: (values: User, path: string) => void;
  signup: (values: User, path: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext({} as AuthContextProps);
const AuthProvider = ({ children }: any) => {
  // decide display login form or register form
  const [isLogedin, setLogedin] = useState(
    getSessionUser() == null ? false : true
  );
  const { isExpired } = useJwt(getSessionUser()?.token || "");

  // Request login api
  const login = (values: User, path: string) => {
    APIClient<User>("/api/auth/login")
      .post(values)
      .then((user) => {
        loginSuccess(user);
        window.location.replace(path);
      })
      .catch((error) => {
        loginError(error);
      });
  };

  // Request sign up api
  const signup = (values: User, path: string) => {
    console.log(values);
    APIClient<User>("/api/auth/signup")
      .post(values)
      .then((user) => {
        registerSuccess(user);
        window.location.replace(path);
      })
      .catch((error) => {
        registerError(error);
      });
  };

  const logout = () => {
    APIClient("/api/auth/logout")
      .post(null)
      .then(() => {
        removeSessionUser();
        notifications.show({
          title: "Notification",
          message: "Logout Success",
          color: "blue",
        });
        setLogedin(false);
      })
      .catch(() => {
        removeSessionUser();
        notifications.show({
          title: "Notification",
          message: "Logout Success",
          color: "blue",
        });
        setLogedin(false);
      });
  };

  const loginSuccess = (user: User) => {
    setSessionUser(user);
    notifications.show({
      title: "Notification",
      message: "Login Success",
      color: "blue",
    });
    setLogedin(true);
  };
  const loginError = (error: any) => {
    notifications.show({
      title: "Notification",
      message: error.response.data.message,
      color: "red",
    });
    setLogedin(false);
  };

  const registerSuccess = (user: User) => {
    setSessionUser(user);
    notifications.show({
      title: "Notification",
      message: "Sign Up Success",
      color: "blue",
    });
    setLogedin(true);
  };
  const registerError = (error: any) => {
    notifications.show({
      title: "Notification",
      message: error.response.data.message,
      color: "red",
    });
    setLogedin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLogedin,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
