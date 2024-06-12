import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Landing from "./component/Landing";
import Login from "./component/Login";
import Register from "./component/Register";
import TopBar from "./component/ui/TopBar";
import TaskList from "./component/feature/task/TaskList";
import ChatWrapper from "./component/feature/chat/ChatWrapper";
import { Box } from "@mui/material";

function App() {
  const home = "/app";
  const [showRegisterLogin, setShowRegisterLogin] = useState(true);
  const updateRegisterLoginButton = (val: boolean) => {
    setShowRegisterLogin(val);
  };
  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <TopBar showRegisterLogin={showRegisterLogin} />
        <Routes>
          <Route
            path={"/"}
            element={<Landing setbarState={updateRegisterLoginButton} />}
          />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route
            path={home}
            element={<Home showRegisterLogin={updateRegisterLoginButton} />}
          >
            <Route path={"tasks"} element={<TaskList />} />
            <Route path={"messages"} element={<ChatWrapper />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
