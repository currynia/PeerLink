interface Props {
  setbarState: (val: boolean) => void;
}
const Landing = (props: Props) => {
  props.setbarState(true);
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
