import { AppDataSource } from "../config/data-source";
import { AppointmentDto, AppointmentScheduleDto } from "../dtos/AppointmentDto";
import { StatusAppointment } from "../interfaces/IAppointments"
import appointmentsRepository from "../repositories/AppointmentsRepository";
import { userRepository } from "../repositories/UserRepository";


export const getAppointmentsServices: () => Promise<AppointmentDto[]> = async(): Promise<AppointmentScheduleDto[]> => {

    const appointments = await appointmentsRepository.find({relations: {
        user: true
    }})
    if(!appointments || appointments.length === 0){
        throw new Error("No existen turnos")
    }

    return appointments.map(appointment => ({
        id: appointment.id,    
        date: appointment.date, 
        time: appointment.time, 
        status: appointment.status, 
        userId: appointment.user.id, 
    }));

}

export const getAppointmentByIdServices: (id: number) => Promise<AppointmentScheduleDto | null>  = 
async (id: number): Promise<AppointmentScheduleDto | null>  => {
    const appointmentWanted = await appointmentsRepository.findOne({where: {id}, relations: ["user"]})

    if(!appointmentWanted){
        throw new Error(`No se pudo encontrar la cita con id: ${id}`)
    }

    const appointmentDTO: AppointmentScheduleDto = {
        id: appointmentWanted.id,
        date: appointmentWanted.date,
        time: appointmentWanted.time,
        status: appointmentWanted.status,
        userId: appointmentWanted.user.id,  
    };
    
    return appointmentDTO;
}

export const scheduleAppointmentServices: (appointmentData: AppointmentScheduleDto) => Promise<AppointmentScheduleDto | undefined> = 
async(appointmentData: AppointmentScheduleDto): Promise<AppointmentScheduleDto | undefined> => {

    const queryRunner = AppDataSource.createQueryRunner(); 
    await queryRunner.connect()

    try{
        await queryRunner.startTransaction();
        await appointmentsRepository.validateExistingAppointment(appointmentData.userId, appointmentData.date, appointmentData.time);
        appointmentsRepository.validateAllowAppointment(appointmentData.date, appointmentData.time);

        if(!appointmentData.userId){
            throw new Error("El ID de usuario es obligatorio para crear un turno.")
        }

        const user = await userRepository.findOneBy({ id: appointmentData.userId });

        if (!user) {
            throw new Error("El usuario con el ID especificado no existe.");
        }

        const newAppointment = appointmentsRepository.create({
            date: appointmentData.date,
            time: appointmentData.time,
            user: user,
        })

        newAppointment.user = user

        newAppointment.status = StatusAppointment.Active

        const savedAppointment = await queryRunner.manager.save(newAppointment)

        await queryRunner.commitTransaction()

        return  {
            id: savedAppointment.id,
            date: savedAppointment.date,
            time: savedAppointment.time,
            status: savedAppointment.status,
            userId: savedAppointment.user.id, 
          };
}catch(error){
    await queryRunner.rollbackTransaction();
    if (error) {
      throw new Error(`${error}`);
    }
    } finally {
      await queryRunner.release();
    }
}


export const cancelAppointmentServices: (id: number) => Promise<void> = 
async(id: number): Promise<void> => {
   const appointment = appointmentsRepository.findOneBy({id})

   if(!appointment || appointment === null){
    throw new Error("Turno no encontrado");
   }

   const result = await appointmentsRepository.update({ id }, { status: StatusAppointment.Cancelled });

   if (result.affected === 0) {
    throw new Error("No se pudo actualizar el estado del turno");
  }

   
}