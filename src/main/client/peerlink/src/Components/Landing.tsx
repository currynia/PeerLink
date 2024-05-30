import TopBar from "./ui/TopBar";

const Landing = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <TopBar landing={true} />
        <h1 style={{ fontSize: 64 }}>PeerLink</h1>
        <small>
          Welcome to PeerLink. Sign up or login to get started and look for
          study buddies in NUS!
        </small>
      </div>
    </>
  );
};

export default Landing;
