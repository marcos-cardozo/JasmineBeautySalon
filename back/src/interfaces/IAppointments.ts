export interface IAppointments {
  id: number;
  date: Date;
  time: string;
  userId: number;
  status: StatusAppointment;
}

export enum StatusAppointment {
  Active = "active",
  Cancelled = "cancelled",
}
