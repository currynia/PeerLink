import { AppBar, Box, Button } from "@mui/material/";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();

  const button = (
    <Box marginRight={2.5}>
      <Button
        sx={{ marginRight: 1 }}
        variant="outlined"
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
      <Button
        disableElevation
        variant="contained"
        onClick={() => navigate("/register")}
      >
        Register
      </Button>
    </Box>
  );
  return (
    <>
      <AppBar
        sx={{
          height: "fit-content",
          width: 1,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position: "relative",
        }}
        elevation={1}
        color="transparent"
      >
        <Box display="flex" alignItems="center">
          <p>Peerlink</p>
          <Box marginLeft="auto">{button}</Box>
        </Box>
      </AppBar>
    </>
  );
};

export default TopBar;
