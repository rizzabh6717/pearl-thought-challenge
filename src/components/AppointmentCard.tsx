import { Appointment, Patient, AppointmentType } from '@/types';
import { appointmentService } from '@/services/appointmentService';
import { format } from 'date-fns';
import { Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppointmentCardProps {
  appointment: Appointment;
  compact?: boolean;
}

const typeColors: Record<AppointmentType, string> = {
  checkup: 'bg-blue-500/10 border-blue-500 text-blue-700 dark:text-blue-400',
  consultation: 'bg-green-500/10 border-green-600 text-green-700 dark:text-green-400',
  followup: 'bg-orange-500/10 border-orange-500 text-orange-700 dark:text-orange-400',
  procedure: 'bg-purple-500/10 border-purple-600 text-purple-700 dark:text-purple-400',
};

export function AppointmentCard({ appointment, compact = false }: AppointmentCardProps) {
  const patient = appointmentService.getPatientById(appointment.patientId);
  const startTime = new Date(appointment.startTime);
  const endTime = new Date(appointment.endTime);
  const duration = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));

  if (!patient) return null;

  return (
    <div
      className={cn(
        'rounded-lg border-l-4 p-3 shadow-sm transition-all hover:shadow-md',
        typeColors[appointment.type],
        compact && 'p-2'
      )}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className={cn('font-medium', compact ? 'text-sm' : 'text-base')}>
              {patient.name}
            </span>
          </div>
          {!compact && (
            <span className="text-xs px-2 py-1 rounded bg-background/50 capitalize">
              {appointment.type}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>
            {format(startTime, 'h:mm a')} - {format(endTime, 'h:mm a')}
          </span>
          <span className="text-xs">({duration} min)</span>
        </div>
        
        {compact && (
          <span className="text-xs capitalize mt-1">
            {appointment.type}
          </span>
        )}
      </div>
    </div>
  );
}
