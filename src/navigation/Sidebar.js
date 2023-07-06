import React, { useContext, useEffect, useMemo, useState } from "react";
import { Stack, Box, List } from "@mui/material";

import { sidebar_links } from "../_nav.js";
import SidebarLink from "./SidebarLink";
import { store } from "../context/MainContext";

import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft"; // <<
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"; // >>

const Sidebar = () => {
  const { sidebarShow, setSidebarShow, userInfo } = useContext(store);
  const [userPermissions, setUserPermissions] = useState([]);

  const getHref = window.location.href.split("#");
  const getPage = getHref[getHref.length - 1];

  const getActivePage = (page) => {
    return page === getPage ? "active" : "";
  };

  useEffect(() => {
    setUserPermissions(userInfo?.sub_permissions);
  }, [userInfo?.sub_permissions]);

  const openClose = () => {
    setSidebarShow(!sidebarShow);
  };

  const filteredRoutes = useMemo(
    () =>
      sidebar_links.filter(
        (x) =>
          !x.permission ||
          x.permission?.some((ai) => userPermissions?.includes(ai))
      ),
    [userPermissions]
  );

  return (
    <>
      <div
        className={sidebarShow ? "sidenav" : "sidenav minimize"}
        id="Sidebar"
      >
        <Stack padding={sidebarShow ? 4 : 0} paddingTop={sidebarShow ? 4 : 4}>
          <Box>
            <List
              className="SidebarLinkList"
              style={{
                alignItems: !sidebarShow ? "center" : "",
              }}
            >
              {filteredRoutes?.map((link, index) => (
                <SidebarLink
                  key={index}
                  link={link}
                  index={index}
                  getActivePage={getActivePage}
                />
              ))}
            </List>
          </Box>
        </Stack>

        <Box
          justifyContent="flex-end"
          sx={{ display: { xs: "flex" } }}
          id="divCollapseUncollapse"
          className="btnCollapse"
          onClick={openClose}
        >
          {sidebarShow === true ? (
            <KeyboardDoubleArrowLeftIcon />
          ) : (
            <KeyboardDoubleArrowRightIcon />
          )}
        </Box>
      </div>
    </>
  );
};

export default React.memo(Sidebar);

function setActiveLinkStyle(linkID) {
  document
    .getElementsByClassName("SidebarLinkList")[0]
    ?.childNodes?.forEach((link) => {
      link.classList.remove("active");
    });
  document.querySelectorAll("[id*=sublink]").forEach((x) => {
    x.classList.remove("active");
  });
  document.querySelectorAll("[id*=sublink2]").forEach((x) => {
    x.classList.remove("active");
  });
  document.getElementById(linkID).classList.add("active");
}
//====================================================================
function openCloseSubMenuAndOthersClose(menuID, sidebarShow) {
  if (menuID !== "" && sidebarShow) {
    document.getElementById(menuID)?.classList.toggle("d-none");
  }

  document.querySelectorAll("[id*=divsublink]").forEach((x) => {
    if (x.id !== menuID) {
      x.classList.add("d-none");
    }
  });
}
//====================================================================
export { setActiveLinkStyle, openCloseSubMenuAndOthersClose };
