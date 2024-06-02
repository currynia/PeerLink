import { useNavigate } from "react-router-dom";
import NavDrawer from "./ui/NavDrawer";
import TopBar from "./ui/TopBar";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (props.role !== "USER") {
  //     navigate("/");
  //   }
  // }, [props.role, navigate]);

  // if (props.role == "USER") {
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
//};

export default Home;
