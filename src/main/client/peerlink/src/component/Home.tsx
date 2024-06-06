import { useEffect, useState } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { ApiAccess } from "../api/ApiAccess";
import NavDrawer from "./ui/NavDrawer";
import TaskList from "./feature/TaskList";

interface Props {
  showRegisterLogin: (bool: boolean) => void;
}
const Home = (props: Props) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(true);

  useEffect(() => {
    ApiAccess.authenticate(setAuth);
  }, []);

  if (auth) {
    props.showRegisterLogin(false);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <NavDrawer />
        <Outlet />
      </div>
    );
  } else {
    props.showRegisterLogin(true);
    navigate("/");
  }
};

export default Home;
