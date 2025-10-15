import { useWeekAppointments } from '@/hooks/useAppointments';
import { AppointmentCard } from './AppointmentCard';
import { Skeleton } from './ui/skeleton';
import { format, isSameDay } from 'date-fns';
import { appointmentService } from '@/services/appointmentService';
import { Calendar } from 'lucide-react';

interface WeekViewProps {
  doctorId: string;
  startDate: Date;
}

export function WeekView({ doctorId, startDate }: WeekViewProps) {
  const { appointments, weekDays, loading } = useWeekAppointments(doctorId, startDate);

  if (loading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  const timeSlots = Array.from({ length: 20 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minute = (i % 2) * 30;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground mb-4">
        <Calendar className="h-4 w-4" />
        <span className="font-medium">
          {format(startDate, 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          {/* Header */}
          <div className="grid grid-cols-8 gap-2 mb-2">
            <div className="p-2 text-sm font-medium text-muted-foreground">Time</div>
            {weekDays.map((day) => (
              <div key={day.toISOString()} className="p-2 text-center">
                <div className="text-sm font-medium">{format(day, 'EEE')}</div>
                <div className="text-xs text-muted-foreground">{format(day, 'MMM d')}</div>
              </div>
            ))}
          </div>

          {/* Time slots grid */}
          <div className="grid gap-0 border rounded-lg overflow-hidden bg-card">
            {timeSlots.map((timeLabel, index) => {
              const hour = Math.floor(index / 2) + 8;
              const minute = (index % 2) * 30;

              return (
                <div key={timeLabel} className="grid grid-cols-8 gap-0 border-b last:border-b-0">
                  <div className="p-2 border-r bg-muted/30 flex items-start text-sm text-muted-foreground">
                    {timeLabel}
                  </div>
                  
                  {weekDays.map((day) => {
                    const slotStart = new Date(day);
                    slotStart.setHours(hour, minute, 0, 0);
                    
                    const slotEnd = new Date(slotStart);
                    slotEnd.setMinutes(slotStart.getMinutes() + 30);

                    const dayAppointments = appointments.filter(apt => {
                      const aptDate = new Date(apt.startTime);
                      return isSameDay(aptDate, day);
                    });

                    const slotAppointments = appointmentService.getAppointmentsForTimeSlot(
                      dayAppointments,
                      slotStart,
                      slotEnd
                    );

                    return (
                      <div key={day.toISOString()} className="p-2 border-r last:border-r-0 min-h-[60px] hover:bg-muted/50 transition-colors">
                        {slotAppointments.length > 0 && (
                          <div className="space-y-1">
                            {slotAppointments.map(apt => (
                              <AppointmentCard key={apt.id} appointment={apt} compact />
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
