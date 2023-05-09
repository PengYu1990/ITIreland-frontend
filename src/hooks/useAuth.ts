import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { getSessionUser, removeSessionUser, setSessionUser } from "../services/session-service";
import { notifications } from "@mantine/notifications";
import APIClient from "../services/http-service";
import { User } from "../services/user-service";

// Auth Hook
const useAuth = (path?:string) => {
  const [opened, { open, close }] = useDisclosure(false);
  // const history = useNavigate();
  // const [user, setUser] = useState<User | null>(getSessionUser());

  // decide display login form or register form
  const [isLogin, setLogin] = useState(true);

  // record global user login state
  const [loginState, setLoginState] = useState(getSessionUser() == null ? "no":"yes");


  const openLoginModal = () => {
    setLogin(true);
    open();
  };

  const openSignUpModal = () => {
    setLogin(false);
    open();
  };

  // Request login api
  const login = (values: User) => {
    APIClient<User>("/api/auth/login")
      .post(values)
      .then((user) => {
        loginSuccess(user);
      })
      .catch((error) => {
        loginError(error);
      });
  };

  // Request sign up api
  const signup = (values: User) => {
    console.log(values);
    APIClient<User>("/api/auth/signup")
      .post(values)
      .then((user) => {
        registerSuccess(user);
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
        setLoginState("no");
      })
      .catch(() => {
        removeSessionUser();
        notifications.show({
          title: "Notification",
          message: "Logout Success",
          color: "blue",
        });
        setLoginState("no");
      });
      
  };

  const loginSuccess = (user: User) => {
    close();
    setSessionUser(user);
    // setUser(getSessionUser());
    notifications.show({
      title: "Notification",
      message: "Login Success",
      color: "blue",
    });
    setLoginState("yes");
    // Reload
    if(path){
      window.location.replace(path);
    }
  };
  const loginError = (error:any) => {
    notifications.show({
      title: "Notification",
      message: error.response.data.message,
      color: "red",
    });
    setLoginState("no");
  };

  const registerSuccess = (user: User) => {
    close();
    setSessionUser(user);
    // setUser(getSessionUser());
    notifications.show({
      title: "Notification",
      message: "Sign Up Success",
      color: "blue",
    });
    setLoginState("yes");
    // Reload
    if(path){
      window.location.replace(path);
    }
  };
  const registerError = (error:any) => {
    notifications.show({
      title: "Notification",
      message: error.response.data.message,
      color: "red",
    });
    setLoginState("no");
  };

  
  return {opened, open, close,  isLogin, loginState,
    openLoginModal, openSignUpModal, 
    login, signup, logout}
}

export default useAuth;