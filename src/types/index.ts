export type AppointmentType = 'checkup' | 'consultation' | 'followup' | 'procedure';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  workingHours: {
    monday?: { start: string; end: string };
    tuesday?: { start: string; end: string };
    wednesday?: { start: string; end: string };
    thursday?: { start: string; end: string };
    friday?: { start: string; end: string };
    saturday?: { start: string; end: string };
    sunday?: { start: string; end: string };
  };
  avatar?: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  type: AppointmentType;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface TimeSlot {
  start: Date;
  end: Date;
  label: string;
}
