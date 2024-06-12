import { AppBar, Box, Button, Paper } from "@mui/material/";
import { useNavigate } from "react-router-dom";

interface Props {
  showRegisterLogin: boolean;
}

const TopBar = (props: Props) => {
  const navigate = useNavigate();
  const button = (
    <Box marginRight={2.5}>
      <Button
        sx={{ marginRight: 1 }}
        variant="outlined"
        onClick={() => navigate("/login")}
      >
        <text>Login</text>
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
        elevation={0}
      >
        <Paper
          square={true}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <p>Peerlink</p>
          <Box sx={{ marginLeft: "auto" }}>
            {props.showRegisterLogin && button}
          </Box>
        </Paper>
      </AppBar>
    </>
  );
};

export default TopBar;
