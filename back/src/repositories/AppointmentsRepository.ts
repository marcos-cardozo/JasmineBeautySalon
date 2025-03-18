import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointment";
import moment from "moment";

const appointmentsRepository = AppDataSource.getRepository(Appointment).extend({
    validateAllowAppointment: function(date: Date, time: string): void {

    const appointmentDateTime = moment(`${moment(date).format('YYYY-MM-DD')} ${time}`, "YYYY-MM-DD HH:mm");
    const now = moment(); 

    if (appointmentDateTime.isoWeekday() === 7 || appointmentDateTime.isoWeekday() === 1) {
      throw new Error("No se permiten turnos los dias Domingo y Lunes.");
    }

    if (appointmentDateTime.diff(now, 'hours') < 24) {
      throw new Error("El turno debe agendarse con al menos 24 horas de antelación.");
    }


    const hour = appointmentDateTime.hour(); 
    if (!( (hour >= 7 && hour < 15))) {
      throw new Error("El turno debe estar entre las 7am y las 3pm.");
    }
  },
  validateExistingAppointment: async function(userId: number, date: Date, time: string): Promise<void> {
       
    const appoinmentFound = await this.findOne({
        where: {
            user: {
                id: userId
            },
            date: date,
            time: time
        }
    })
    
    if (appoinmentFound) {
      throw new Error(`La cita con fecha: ${date}, y hora: ${time}, para el usuario con id ${userId}, ya existe.`)
    }
  }

});

export default appointmentsRepository;
