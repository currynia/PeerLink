import NavDrawer from "./ui/NavDrawer";
import TopBar from "./ui/TopBar";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: 30,
      }}
    >
      <TopBar landing={false} />
      <NavDrawer />
    </div>
  );
};

export default Home;
