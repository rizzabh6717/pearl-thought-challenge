import { useState, useEffect, useMemo } from 'react';
import { appointmentService } from '@/services/appointmentService';
import { Appointment, Doctor, TimeSlot } from '@/types';
import { format } from 'date-fns';

export function useAppointments(doctorId: string, date: Date) {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctor, setDoctor] = useState<Doctor | undefined>();

  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const doc = appointmentService.getDoctorById(doctorId);
      const apts = appointmentService.getAppointmentsByDoctorAndDate(doctorId, date);
      
      setDoctor(doc);
      setAppointments(apts);
      setLoading(false);
    }, 300);
  }, [doctorId, date]);

  const timeSlots = useMemo((): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const currentDate = new Date(date);
    
    for (let hour = 8; hour < 18; hour++) {
      for (const minute of [0, 30]) {
        const start = new Date(currentDate);
        start.setHours(hour, minute, 0, 0);
        
        const end = new Date(start);
        end.setMinutes(start.getMinutes() + 30);
        
        slots.push({
          start,
          end,
          label: format(start, 'h:mm a'),
        });
      }
    }
    
    return slots;
  }, [date]);

  const getAppointmentsForSlot = (slotStart: Date, slotEnd: Date): Appointment[] => {
    return appointmentService.getAppointmentsForTimeSlot(appointments, slotStart, slotEnd);
  };

  return {
    appointments,
    doctor,
    timeSlots,
    loading,
    getAppointmentsForSlot,
  };
}

export function useWeekAppointments(doctorId: string, startDate: Date) {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctor, setDoctor] = useState<Doctor | undefined>();

  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      const doc = appointmentService.getDoctorById(doctorId);
      const apts = appointmentService.getAppointmentsByDoctorAndWeek(doctorId, startDate);
      
      setDoctor(doc);
      setAppointments(apts);
      setLoading(false);
    }, 300);
  }, [doctorId, startDate]);

  const weekDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  }, [startDate]);

  return {
    appointments,
    doctor,
    weekDays,
    loading,
  };
}
