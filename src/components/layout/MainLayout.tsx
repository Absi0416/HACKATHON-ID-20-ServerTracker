/*import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import Sidebar from "../common/Sidebar";
import Topbar from "../common/Topbar";

const MainLayout = () => {
  if(false){
  return (   
    <Box  sx={{ display: "flex" }}>
      <Topbar />
      <Box
        component="nav"
        sx={{
          width: sizeConfigs.sidebar.width,
          flexShrink: 0
        }}
      >
        <Sidebar />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${sizeConfigs.sidebar.width})`,
          minHeight: "100vh",
          backgroundColor: colorConfigs.mainBg
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>);}
    else { return ( <Box  sx={{ display: "flex" }}>
    <Topbar />
    <Box
      component="nav"
      sx={{
        width: sizeConfigs.sidebar.width,
        flexShrink: 0
      }}
    >
      <Sidebar />
    </Box>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        minHeight: "100vh",
        backgroundColor: colorConfigs.mainBg
      }}
    >
      <Toolbar />
      <Outlet />
    </Box>
  </Box>)};
};

export default MainLayout;*/

import { Outlet, useLocation } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import Sidebar from "../common/Sidebar";
import Topbar from "../common/Topbar";

const MainLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login"; // Assuming "/login" is your login route
  const isRegistrationPage = location.pathname === "/registration"; // Assuming "/register" is your register route

  return (
    <Box sx={{ display: "flex" }}>
      <Topbar />
      {!isLoginPage && !isRegistrationPage &&( // Render Sidebar only if not on the login page
        <Box
          component="nav"
          sx={{
            width: sizeConfigs.sidebar.width,
            flexShrink: 0
          }}
        >
          <Sidebar />
        </Box>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: isLoginPage ? "100%" : `calc(100% - ${sizeConfigs.sidebar.width})`, // Adjust width based on login page
          minHeight: "100vh",
          backgroundColor: colorConfigs.mainBg
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;