import { useContext, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./view/Home/Home";
import Login from "./view/Login/Login";
import MyAppointments from "./view/MyAppoinments/MyAppointments";
import Register from "./view/Register/Register";
import AboutUs from "./view/AboutUs/AboutUs";
import ErrorNotFound from "./view/ErrorNotFound/ErrorNotFound";
import "./App.css";
import { UsersContext } from "./context/UserContext";
import CreateAppointmentView from "./view/CreateAppointmentView/CreateAppointmentView";

function App() {
  const { isLogged } = useContext(UsersContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged && location.pathname !== "/login" && location.pathname !== "/register") {
      navigate("/login");
    }

    if (isLogged && (location.pathname === "/login" || location.pathname === "/register")) {
      navigate("/");
    }
  }, [isLogged, location.pathname, navigate]);

  return (
    <>
      {!isLogged ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<ErrorNotFound />} />
        </Routes>
      ) : (
        <>
          <NavBar />
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/createAppointment" element={<CreateAppointmentView />} />
            <Route path="/myAppointments" element={<MyAppointments />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="*" element={<ErrorNotFound />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
