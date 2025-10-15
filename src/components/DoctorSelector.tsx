import { Doctor } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Stethoscope } from 'lucide-react';

interface DoctorSelectorProps {
  doctors: Doctor[];
  selectedDoctorId: string;
  onDoctorChange: (doctorId: string) => void;
}

export function DoctorSelector({ doctors, selectedDoctorId, onDoctorChange }: DoctorSelectorProps) {
  const selectedDoctor = doctors.find(d => d.id === selectedDoctorId);

  return (
    <div className="space-y-2">
      <Select value={selectedDoctorId} onValueChange={onDoctorChange}>
        <SelectTrigger className="w-full md:w-[300px] bg-card">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-primary" />
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-popover">
          {doctors.map((doctor) => (
            <SelectItem key={doctor.id} value={doctor.id}>
              <div className="flex flex-col">
                <span className="font-medium">{doctor.name}</span>
                <span className="text-sm text-muted-foreground">{doctor.specialty}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {selectedDoctor && (
        <div className="text-sm text-muted-foreground">
          Working Hours: {Object.entries(selectedDoctor.workingHours)
            .filter(([_, hours]) => hours)
            .map(([day, hours]) => `${day.charAt(0).toUpperCase() + day.slice(1)}: ${hours?.start}-${hours?.end}`)
            .join(', ')}
        </div>
      )}
    </div>
  );
}
