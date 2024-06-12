import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { StompSessionProvider } from "react-stomp-hooks";
import { ApiAccess } from "../api/ApiAccess";
import NavDrawer from "./ui/NavDrawer";

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
      <StompSessionProvider url={"/ws"}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
          }}
        >
          <NavDrawer />
          <Outlet />
        </div>
      </StompSessionProvider>
    );
  } else {
    props.showRegisterLogin(true);
    navigate("/");
  }
};

export default Home;
