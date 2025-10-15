import { useState } from 'react';
import { DoctorSelector } from '@/components/DoctorSelector';
import { DayView } from '@/components/DayView';
import { WeekView } from '@/components/WeekView';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { appointmentService } from '@/services/appointmentService';
import { Calendar as CalendarIcon, CalendarDays, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useNavigate } from 'react-router-dom';

type ViewType = 'day' | 'week';

export default function Schedule() {
  const navigate = useNavigate();
  const doctors = appointmentService.getAllDoctors();
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0].id);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewType, setViewType] = useState<ViewType>('day');

  const selectedDoctor = doctors.find(d => d.id === selectedDoctorId);

  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Appointment Schedule</h1>
              {selectedDoctor && (
                <p className="text-muted-foreground">
                  {selectedDoctor.name} - {selectedDoctor.specialty}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Date Picker */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    {format(selectedDate, 'MMM d, yyyy')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-popover" align="end">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>

              {/* View Toggle */}
              <div className="flex gap-2">
                <Button
                  variant={viewType === 'day' ? 'default' : 'outline'}
                  onClick={() => setViewType('day')}
                  className="gap-2"
                >
                  <CalendarIcon className="h-4 w-4" />
                  Day View
                </Button>
                <Button
                  variant={viewType === 'week' ? 'default' : 'outline'}
                  onClick={() => setViewType('week')}
                  className="gap-2"
                >
                  <CalendarDays className="h-4 w-4" />
                  Week View
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Card className="p-6">
          <div className="mb-6">
            <DoctorSelector
              doctors={doctors}
              selectedDoctorId={selectedDoctorId}
              onDoctorChange={setSelectedDoctorId}
            />
          </div>

          <div className="mt-6">
            {viewType === 'day' ? (
              <DayView doctorId={selectedDoctorId} date={selectedDate} />
            ) : (
              <WeekView doctorId={selectedDoctorId} startDate={getWeekStart(selectedDate)} />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
