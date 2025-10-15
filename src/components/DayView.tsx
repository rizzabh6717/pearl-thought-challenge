import { useAppointments } from '@/hooks/useAppointments';
import { AppointmentCard } from './AppointmentCard';
import { Skeleton } from './ui/skeleton';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';

interface DayViewProps {
  doctorId: string;
  date: Date;
}

export function DayView({ doctorId, date }: DayViewProps) {
  const { timeSlots, getAppointmentsForSlot, loading } = useAppointments(doctorId, date);

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground mb-4">
        <Calendar className="h-4 w-4" />
        <span className="font-medium">{format(date, 'EEEE, MMMM d, yyyy')}</span>
      </div>

      <div className="grid gap-0 border rounded-lg overflow-hidden bg-card">
        {timeSlots.map((slot) => {
          const appointments = getAppointmentsForSlot(slot.start, slot.end);
          const hasAppointments = appointments.length > 0;

          return (
            <div
              key={slot.label}
              className="grid grid-cols-[100px_1fr] border-b last:border-b-0 hover:bg-muted/50 transition-colors"
            >
              <div className="p-3 border-r bg-muted/30 flex items-start">
                <span className="text-sm font-medium text-muted-foreground">
                  {slot.label}
                </span>
              </div>
              
              <div className="p-3 min-h-[60px]">
                {hasAppointments ? (
                  <div className="space-y-2">
                    {appointments.map((apt) => (
                      <AppointmentCard key={apt.id} appointment={apt} />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                    No appointments
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
