import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import Landing from "./component/Landing";
import Home from "./component/Home";
import { useState } from "react";
import TaskList from "./component/feature/TaskList";

function App() {
  const home = "/app";
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Landing />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={home} element={<Home />} />
        <Route path={home + "/task"} element={<TaskList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
