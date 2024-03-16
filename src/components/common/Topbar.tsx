import { AppBar, Button, Toolbar, Typography, makeStyles } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import { text } from "stream/consumers";
import { CenterFocusStrong } from "@mui/icons-material";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/login', { state: { reg: "login" } });
  };


  return (    
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        ml: sizeConfigs.sidebar.width,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color,
        align: "center"
      }}
    >
      <Toolbar color="inherit">
        <Typography sx={{ marginLeft: "auto" }} variant="h3" >
          Server Tracker
        </Typography>
        <Button sx={{ marginLeft: "auto" }}
                style={{ height: "fit-content" }}
                color="primary"
                variant="contained"
                onClick={logout}
              >
                Logout
              </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;