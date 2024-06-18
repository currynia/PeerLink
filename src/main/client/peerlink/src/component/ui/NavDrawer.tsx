import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import TaskIcon from "@mui/icons-material/Task";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const NavDrawer = () => {
  const navigate = useNavigate();
  const paths = ["profile", "matching", "all-sessions", "tasks", "settings"];
  const icons = [
    <AccountCircleIcon />,
    <PeopleIcon />,
    <MenuBookIcon />,
    <TaskIcon />,
    <SettingsIcon />,
  ];
  return (
    <Drawer
      sx={{
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          position: "relative",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        {["Profile", "Match", "Sessions", "ToDo", "Settings"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => navigate(paths[index])}>
                <ListItemIcon>{icons[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Drawer>
  );
};

export default NavDrawer;
