import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { StatusAppointment } from "../interfaces/IAppointments";

@Entity({
    name: "appointments",
})
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "date", nullable: false})
    date: Date;

    @Column({type: "varchar", length: 5, nullable: false})
    time: string;

    @Column({type: "varchar", length: 10, nullable: false, default: StatusAppointment.Active})
    status: string;

    @ManyToOne(() => User, user => user.appointments, {nullable: true})
    @JoinColumn()
    user: User;
}