import { Box } from "@mui/material";
import TopBar from "./ui/TopBar";

const Landing = () => {
  return (
    <>
      <TopBar />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <h1 style={{ fontSize: 64 }}>PeerLink</h1>
        <small>
          Welcome to PeerLink. Sign up or login to get started and look for
          study buddies in NUS!
        </small>
      </Box>
    </>
  );
};

export default Landing;
