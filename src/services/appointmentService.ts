import { appointments, doctors, patients } from '@/data/mockData';
import { Appointment, Doctor, Patient } from '@/types';
import { isSameDay, isWithinInterval } from 'date-fns';

export class AppointmentService {
  private appointments: Appointment[];
  private doctors: Doctor[];
  private patients: Patient[];

  constructor() {
    this.appointments = appointments;
    this.doctors = doctors;
    this.patients = patients;
  }

  getAllDoctors(): Doctor[] {
    return this.doctors;
  }

  getDoctorById(id: string): Doctor | undefined {
    return this.doctors.find(d => d.id === id);
  }

  getPatientById(id: string): Patient | undefined {
    return this.patients.find(p => p.id === id);
  }

  getAppointmentsByDoctorAndDate(doctorId: string, date: Date): Appointment[] {
    return this.appointments.filter(apt => {
      const aptDate = new Date(apt.startTime);
      return apt.doctorId === doctorId && isSameDay(aptDate, date);
    });
  }

  getAppointmentsByDoctorAndWeek(doctorId: string, startDate: Date): Appointment[] {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    return this.appointments.filter(apt => {
      const aptDate = new Date(apt.startTime);
      return apt.doctorId === doctorId && isWithinInterval(aptDate, {
        start: startDate,
        end: endDate
      });
    });
  }

  getAppointmentsForTimeSlot(
    appointments: Appointment[],
    slotStart: Date,
    slotEnd: Date
  ): Appointment[] {
    return appointments.filter(apt => {
      const aptStart = new Date(apt.startTime);
      const aptEnd = new Date(apt.endTime);
      
      // Check if appointment overlaps with time slot
      return (
        (aptStart >= slotStart && aptStart < slotEnd) ||
        (aptEnd > slotStart && aptEnd <= slotEnd) ||
        (aptStart <= slotStart && aptEnd >= slotEnd)
      );
    });
  }
}

export const appointmentService = new AppointmentService();
