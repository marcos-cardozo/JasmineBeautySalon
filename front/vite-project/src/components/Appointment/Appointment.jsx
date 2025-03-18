/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useState } from "react";
import styles from "./Appoinment.module.css";
import moment from "moment";
import { UsersContext } from "../../context/UserContext";
import Swal from "sweetalert2";


const appointment = ({id , date, time, status}) => {
    const [currentStatus, setCurrentStatus] = useState(status);

const showAlert = (icon, title, text) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text
    });
  } 


const {cancelAppointment} = useContext(UsersContext);

const containerClass = status === "cancelled" ? `${styles.appointmentContainer} ${styles.cancelledAppointment}` : styles.appointmentContainer;

const isCancelable = () => {

    const [year, month, dayHour] = date.split("-");
    const day = dayHour.split("T")[0].split("-")[0];

    const [appHour, appMinute] = time.split(":");

    const appointmentDate = new Date(
        parseInt(year),
        parseInt(month) - 1, 
        parseInt(day),
        parseInt(appHour),
        parseInt(appMinute)
    );


    const nowLocal = new Date();
    const diffMinutes = Math.abs((appointmentDate - nowLocal) / (1000 * 60));

    if (diffMinutes <= 1440) {
        return false;
    } else {
        return true
    } 
}

const cancelAppointmentFunction = async() => {
    if (!isCancelable()) {
        showAlert('warning', 'No se puede cancelar', 'No se puede cancelar la reserva dentro de las 24 horas anteriores al turno.');
        return; 
    }
    cancelAppointment(id)
    try {
        await cancelAppointment(id);
        showAlert('success', 'Cita cancelado', 'Tu cita se canceló con éxito');
        setCurrentStatus("cancelled");
    } catch (error) {
        console.error("Error al cancelar la cita:", error);

    }
};


    
    return (
        <div className={containerClass}>
            <h3 className={styles.appoinmentDetails}>Dia: <span>{moment(date).format("DD/MM/YYYY")}</span></h3>
            <h3 className={styles.appoinmentDetails}>Hora: <span>{time}</span></h3>
            <h3 className={styles.appoinmentDetails}><span>{status}</span></h3>
            <div className={styles.buttomCancelContainer}>
            <button className={styles.buttomCancel} onClick={cancelAppointmentFunction} disabled={status === "cancelled"}>Cancelar turno</button>
            </div>
        </div>
    );
}

export default appointment