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
import jwt_decode, { JwtPayload } from "jwt-decode";

interface AuthContextProps {
  isAuthenticated: () => boolean;
  login: (values: User, path: string) => void;
  signup: (values: User, path: string) => void;
  logout: () => void;
  user: User | null;
}

const AuthContext = React.createContext({} as AuthContextProps);
const AuthProvider = ({ children }: any) => {
  const isAuthenticated = () => {
    const user = getSessionUser();
    const token = user?.token;
    if (token === null || token === undefined) return false;
    const { exp } = jwt_decode<JwtPayload>(token);
    if (exp && Date.now() >= exp * 1000) {
      logout();
      return false;
    }
    return true;
  };

  const [user, setUser] = useState<User | null>(
    isAuthenticated() ? getSessionUser() : null
  );

  // Request login api
  const login = (values: User, path: string) => {
    APIClient<User>("/api/auth/login")
      .post(values)
      .then((user) => {
        setSessionUser(user);
        setUser(user);
        notifications.show({
          title: "Notification",
          message: "Login Success",
          color: "blue",
        });
        window.location.replace(path);
      })
      .catch((error) => {
        notifications.show({
          title: "Notification",
          message: error.response.data.message,
          color: "red",
        });
      });
  };

  // Request sign up api
  const signup = (values: User, path: string) => {
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
        window.location.replace(path);
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
