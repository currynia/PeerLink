import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { StompSessionProvider } from "react-stomp-hooks";
import { ApiAccess } from "../api/ApiAccess";
import NavDrawer from "./ui/NavDrawer";

const Home = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(true);

  useEffect(() => {
    ApiAccess.authenticate(setAuth);
  }, []);

  if (auth) {
    return (
      <StompSessionProvider url={"/ws"}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",

            maxWidth: "100%",
          }}
        >
          <Box width="20%">
            <NavDrawer />
          </Box>

          <Box width="80%" height="100%">
            <Outlet />
          </Box>
        </div>
      </StompSessionProvider>
    );
  } else {
    navigate("/");
  }
};

export default Home;
