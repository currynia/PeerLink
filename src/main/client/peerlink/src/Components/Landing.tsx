import { Container } from "@mui/material";
import TopBar from "./ui/TopBar";

const Landing = () => {
  return (
    <>
      <div style={{ marginBottom: 80 }}>
        <TopBar landing={true} />
      </div>

      <Container maxWidth={false} sx={{ textAlign: "center" }}>
        <h1 style={{ fontSize: 64 }}>PeerLink</h1>
        <small>
          Welcome to PeerLink. Sign up or login to get started and look for
          study buddies in NUS!
        </small>
      </Container>
    </>
  );
};

export default Landing;
