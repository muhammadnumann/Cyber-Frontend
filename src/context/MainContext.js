import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

const store = React.createContext();
const { Provider } = store;

const MainProvider = ({ children }) => {
  const isWaitLoad = true;
  const [userInfo, setUserInfo] = useState(
    process.env.NODE_ENV === "development"
      ? {
          sub: "development",
          sub_status: "active",
          sub_default_membership_type_id: 35,
          sub_id: 1,
          sub_default_subscription_id: "eb754b27-10f5-438e-864e-3089e32ea423",
          sub_app: 9,
          iss: "https://a3m-staging.clarusway.com",
          sub_default_org_id: 1679576004519525,
          nonce: "ukHOwK8GFp3f8mAf7TjItbbitPiIF0blajnWmv1tF0c",
          sub_permissions: [
            "ROLE_Users",
            "file:read",
            "file:write",
            "user:read",
          ],
          sub_roles: [
            {
              subscription_id: "eb754b27-10f5-438e-864e-3089e32ea423",
              role_id: 187,
              organization_id: 1679576004519525,
              name: "Users",
              organization_name: "Cyber LLC",
              is_default: true,
            },
          ],
        }
      : {}
  );

  let a3m_api_root = "/a3m";
  if (process.env.NODE_ENV === "development") {
    a3m_api_root = "http://127.0.0.1:9001/a3m";
  }

  const [sidebarShow, setSidebarShowStatus] = useState(
    localStorage.getItem("sidebarShow") === null
      ? true
      : localStorage.getItem("sidebarShow") === "true"
      ? true
      : false
  );
  const [darkMode, setDarkModeStatus] = useState(
    localStorage.getItem("darkMode") === "true" ? true : false
  );

  const setSidebarShow = (isShow) => {
    setSidebarShowStatus(isShow);
    localStorage.setItem("sidebarShow", isShow ? "true" : "false");
  };
  const setDarkMode = (isDark) => {
    setDarkModeStatus(isDark);
    localStorage.setItem("darkMode", isDark ? "true" : "false");
  };
  const getUser = useCallback(async () => {
    if (process.env.NODE_ENV !== "development") {
      await axios
        .get("/auth/userinfo", { withCredentials: true })
        .then((response) => setUserInfo(response.data))
        .catch((err) => (window.location.href = "/login"));
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const values = {
    isWaitLoad,
    sidebarShow,
    setSidebarShow,
    darkMode,
    setDarkMode,
    userInfo,
    a3m_api_root,
  };

  return <Provider value={values}>{children}</Provider>;
};
export { store, MainProvider };
