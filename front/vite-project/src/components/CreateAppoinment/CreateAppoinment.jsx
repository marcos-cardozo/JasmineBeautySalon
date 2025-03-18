import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../context/UserContext";
import styles from "./CreateAppoinment.module.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function showAlert(icon, title, text) {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        width: '400px',
        color: '##F5F5DC', 
        background: '#F5F5DC', 
        iconColor: '#3C8C91', 
        confirmButtonColor: '#3C8C91', 
    });
  }

const CreateAppointment = () => {

    const { createAppointment, user } = useContext(UsersContext);

    const [form, setForm] = useState({date: "", time: "", userId: user?.id || ""});

    const navigate = useNavigate();

    useEffect(() => {
        setForm((prevForm) => ({
          ...prevForm,
          userId: user, 
        }));
    }, [user]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        setForm((prevForm) => ({
          ...prevForm,
          [name]: value, 
        }));
      };

    const handleOnSubmit = async(e) => {
        e.preventDefault();



        if (!form.date  || !form.time  ||  !form.userId) {
            return;
          }

          try {
            await createAppointment(form);
            showAlert('success', 'Turno agendado con éxito', 'Tu turno ha sido gestionado con éxito.');
            navigate("/myAppointments");

          } catch (error) {
            if (error.response) {
              const { message, data } = error.response.data;
              showAlert('error', message, data);
            } else {
              console.error("Error desconocido:", error);
              showAlert('error', 'Error desconocido', 'Ocurrió un error inesperado al realizar la reserva.');
            }
          }

    }

    return (
        <div className={styles.createAppointmentContainer}>
            <h1 className={styles.titleCreateAppointment}>Agendar un nuevo turno</h1>

            <form onSubmit={handleOnSubmit}>
                <label className={styles.labelItem}>Fecha:</label>
                <input type="date" name="date" className={styles.inputItem} onChange={handleInputChange}/>                <label className={styles.labelItem}>Hora:</label>
                <input type="time" name="time" className={styles.inputItem}  onChange={handleInputChange}/>
                <div className={styles.buttonCreateAppointmentContainer}>
                <button className={styles.buttonCreateAppointment} type="submit">Crear turno</button>
                </div>
            </form>
        </div>
    )
}

export default CreateAppointment;