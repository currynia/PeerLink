import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Landing from "./component/Landing";
import Login from "./component/Login";
import Register from "./component/Register";
import TopBar from "./component/ui/TopBar";
import TaskList from "./component/feature/task/TaskList";
import AllStudySession from "./component/feature/studysession/AllStudySession";
import MyStudySession from "./component/feature/studysession/MySession"
import ProfilePage from "./component/feature/profile/ProfilePage";
import Matching from "./component/feature/matching/Matching";

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
          rowGap: 30,
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
            <Route path={"all-sessions"} element={<AllStudySession />} />
            <Route path={"my-sessions"} element={<MyStudySession />} />
            <Route path={"profile"} element={<ProfilePage />} />
            <Route path={"matching"} element={<Matching />}/>

          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
