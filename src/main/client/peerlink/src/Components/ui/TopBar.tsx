import { AppBar, Box, Button, Paper } from "@mui/material/";
import { useNavigate } from "react-router-dom";

interface Props {
  landing: boolean;
}

const TopBar = (props: Props) => {
  const navigate = useNavigate();
  const button = (
    <Box>
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
          height: 30,
          margin: 0,
          width: 1,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        elevation={0}
      >
        <Paper
          square={true}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: 1,
          }}
        >
          <p>Peerlink</p>
          <Box sx={{ marginLeft: "auto" }}>{props.landing && button}</Box>
        </Paper>
      </AppBar>
    </>
  );
};

export default TopBar;
