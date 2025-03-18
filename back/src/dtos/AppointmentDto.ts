export interface AppointmentScheduleDto {
    date: Date,
    time: string,
    userId: number
}

export interface AppointmentDto{
    date: Date,
    time: string,
    status?: string
    userId: number
}

export interface AppointmentScheduleDto{
    id: number,
    date: Date,
    time: string,
    status?: string
    userId: number
}

