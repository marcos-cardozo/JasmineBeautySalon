/* eslint-disable react-hooks/exhaustive-deps */
import {  useEffect, useContext } from "react";
import Appointment from "../../components/Appointment/Appointment";
import styles from "./MyAppoinments.module.css";

import { UsersContext } from "../../context/UserContext";

const MyAppointments = () => {

  const { userAppointments, renderAppointments, user} = useContext(UsersContext);

  useEffect(() => {
    try{
        renderAppointments(user)

      }catch(error){
        console.error("Hubo un error al obtener los turnos:", error);
      }}, [user]);
    
  return (
    <div>
      <h1 className={styles.principalTitle}>Mis Turnos</h1>

      <div className={styles.appoinmentsContainer}>
        {userAppointments.length > 0 ? (
          userAppointments.map(({ id, time, date, status }) => {
            return (
              <Appointment
                key={id}
                id={id}
                time={time}
                date={date}
                status={status}
              />
            );
          })
        ) : (
          <div className={styles.noAppointmentsContainer}>
            <h2 className={`${styles.principalTitle} ${styles.ErrorTittle}`}>
              No hay turnos agendados aún
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
