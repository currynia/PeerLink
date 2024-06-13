import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import TaskIcon from "@mui/icons-material/Task";
import { useTheme } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const NavDrawer = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const paths = [
    "profile",
    "match",
    "sessions",
    "tasks",
    "messages",
    "settings",
  ];
  const icons = [
    <AccountCircleIcon />,
    <PeopleIcon />,
    <MenuBookIcon />,
    <TaskIcon />,
    <MailIcon />,
    <SettingsIcon />,
  ];
  return (
    <Drawer
      sx={{
        [`& .MuiPaper-root`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          position: "relative",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        {["Profile", "Match", "Sessions", "ToDo", "Messages", "Settings"].map(
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
