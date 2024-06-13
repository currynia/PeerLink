import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Landing from "./component/Landing";
import Login from "./component/Login";
import Register from "./component/Register";
import ChatWrapper from "./component/feature/chat/ChatWrapper";
import TaskList from "./component/feature/task/TaskList";

function App() {
  const home = "/app";

  return (
    <BrowserRouter>
      <Box display="flex" flexDirection="column" height="100%">
        <Routes>
          <Route path={"/"} element={<Landing />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={home} element={<Home />}>
            <Route path={"tasks"} element={<TaskList />} />
            <Route path={"messages"} element={<ChatWrapper />} />
          </Route>
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
