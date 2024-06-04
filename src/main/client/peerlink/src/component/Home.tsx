import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authentication } from "../Auth/Authentication";
import NavDrawer from "./ui/NavDrawer";

interface Props {
  showRegisterLogin: (bool: boolean) => void;
}
const Home = (props: Props) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(true);

  useEffect(() => {
    Authentication.authenticate(setAuth);
  }, []);

  if (auth) {
    props.showRegisterLogin(false);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: 30,
        }}
      >
        <NavDrawer />
      </div>
    );
  } else {
    props.showRegisterLogin(true);
    navigate("/");
  }
};

export default Home;
