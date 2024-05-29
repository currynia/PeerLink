import NavDrawer from "./ui/NavDrawer";
import TopBar from "./ui/TopBar";

const Home = () => {
  return (
    <>
      <TopBar landing={false} />
      <NavDrawer />
    </>
  );
};

export default Home;
