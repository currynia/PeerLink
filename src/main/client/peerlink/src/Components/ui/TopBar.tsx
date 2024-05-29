import { Paper, Box, Button } from "@mui/material/";
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
      <Paper
        sx={{ display: "flex", alignItems: "center", padding: 1 }}
        variant="elevation"
        elevation={2}
      >
        <text>Peerlink</text>
        <Box sx={{ marginLeft: "auto" }}>{props.landing && button}</Box>
      </Paper>
    </>
  );
};

export default TopBar;
