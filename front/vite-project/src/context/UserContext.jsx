/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UsersContext = createContext({
  user: null,
  isLogged: false,
  userAppointments: [],
  registerUser: async () => {},
  loginUser: async () => {},
  renderAppointments: async () => {},
  createAppointment: async () => {},
  addAppointment: () => {},
  cancelAppointment: async () => {},
});

export const UsersProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user") ?? null);
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("user"));
  const [userAppointments, setUserAppointments] = useState([]);

  // Sincroniza `isLogged` al cargar
  useEffect(() => {
    setIsLogged(!!user);
  }, [user]);

  const registerUser = async (userData) => {
    return await axios.post("http://localhost:3000/users/register", userData);
  };

  const loginUser = async (loginData) => {
    const res = await axios.post("http://localhost:3000/users/login", loginData);
    localStorage.setItem("user", res.data.user.id);
    setUser(res.data.user.id);
    return res;
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
    setUserAppointments([]);
  };

  const renderAppointments = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      setUserAppointments(response.data.data.appointments);
    } catch (error) {
      console.error("Error al obtener las citas:", error);
    }
  };

  const createAppointment = async (appointmentData) => {
    await axios.post("http://localhost:3000/appointments/schedule", appointmentData);
  };

  const addAppointment = (newAppointment) => {
    setUserAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      await axios.put(`http://localhost:3000/appointments/cancel/${appointmentId}`);
      const newAppointments = userAppointments.map((appointment) =>
        appointment.id === appointmentId ? { ...appointment, status: "cancelled" } : appointment
      );
      setUserAppointments(newAppointments);
    } catch (error) {
      console.error("Error al cancelar la reserva", error);
    }
  };

  const value = {
    user,
    isLogged,
    userAppointments,
    registerUser,
    loginUser,
    logoutUser,
    renderAppointments,
    createAppointment,
    addAppointment,
    cancelAppointment,
  };

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
};
