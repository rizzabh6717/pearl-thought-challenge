import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Calendar, Stethoscope, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { appointmentService } from '@/services/appointmentService';

export default function Index() {
  const navigate = useNavigate();
  const doctors = appointmentService.getAllDoctors();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Hospital Management System</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Appointment Scheduler
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Streamline your hospital's appointment management with intuitive calendar views,
            real-time scheduling, and comprehensive doctor availability tracking.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/schedule')}
              className="gap-2 text-lg h-12 px-8"
            >
              View Schedule
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/schedule')}
              className="gap-2 text-lg h-12 px-8"
            >
              <Calendar className="h-5 w-5" />
              Browse Appointments
            </Button>
          </div>
        </div>

        {/* Doctors Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Available Doctors</h2>
              <p className="text-muted-foreground">
                Our team of specialized healthcare professionals
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="p-6 rounded-lg border bg-card hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Stethoscope className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>
                        {doctor.workingHours.start} - {doctor.workingHours.end}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button
                onClick={() => navigate('/schedule')}
                size="lg"
                className="gap-2"
              >
                View All Appointments
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>Hospital Appointment Scheduler © 2024</p>
            <p className="mt-1">Built with React, TypeScript, and modern architecture patterns</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
