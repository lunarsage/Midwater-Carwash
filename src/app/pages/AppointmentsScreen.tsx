import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Calendar, Clock, Car, MapPin, XCircle } from "lucide-react";
import { AppBar } from "../components/AppBar";
import { BottomNav } from "../components/BottomNav";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { StatusBadge } from "../components/StatusBadge";
import { EmptyState } from "../components/EmptyState";
import { useAuth } from "../auth/AuthContext";

export function AppointmentsScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");

  if (!user) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <AppBar title="Appointments" />

        <div className="px-4 py-6 max-w-md mx-auto">
          <EmptyState
            icon={Calendar}
            title="Sign in to see your bookings"
            description="Appointments are linked to your account. Create one to book a wash and track progress."
            actionLabel="Sign in"
            onAction={() => navigate("/login")}
          />
        </div>

        <BottomNav />
      </div>
    );
  }

  const activeAppointments = [
    {
      id: 1,
      service: "Premium Wash",
      date: "Today",
      time: "2:00 PM",
      vehicle: "Tesla Model 3",
      plate: "ABC 1234",
      status: "approved" as const,
      location: "Main Street Branch"
    },
    {
      id: 2,
      service: "Express Wash",
      date: "Tomorrow",
      time: "10:00 AM",
      vehicle: "Toyota Camry",
      plate: "XYZ 5678",
      status: "pending" as const,
      location: "Downtown Branch"
    },
  ];

  const historyAppointments = [
    {
      id: 3,
      service: "Deluxe Detail",
      date: "Apr 5, 2026",
      time: "3:00 PM",
      vehicle: "Tesla Model 3",
      plate: "ABC 1234",
      status: "completed" as const,
      location: "Main Street Branch"
    },
    {
      id: 4,
      service: "Premium Wash",
      date: "Apr 1, 2026",
      time: "11:00 AM",
      vehicle: "Toyota Camry",
      plate: "XYZ 5678",
      status: "completed" as const,
      location: "Downtown Branch"
    },
    {
      id: 5,
      service: "Express Wash",
      date: "Mar 28, 2026",
      time: "4:00 PM",
      vehicle: "Tesla Model 3",
      plate: "ABC 1234",
      status: "cancelled" as const,
      location: "Main Street Branch"
    },
  ];

  const appointments = activeTab === "active" ? activeAppointments : historyAppointments;

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppBar title="Appointments" />

      <div className="px-4 py-6 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 mb-6 p-1 bg-secondary rounded-lg"
        >
          <button
            onClick={() => setActiveTab("active")}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${
              activeTab === "active"
                ? "bg-card shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${
              activeTab === "history"
                ? "bg-card shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            History
          </button>
        </motion.div>

        {appointments.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="No Appointments"
            description="You don't have any appointments yet. Book your first car wash now!"
            actionLabel="Book Now"
            onAction={() => navigate("/services")}
          />
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 1, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hoverable onClick={() => navigate(`/appointments/${appointment.id}`)}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="mb-2">{appointment.service}</h3>
                      <StatusBadge status={appointment.status} />
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{appointment.date}</span>
                      <Clock className="w-4 h-4 ml-2" />
                      <span>{appointment.time}</span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Car className="w-4 h-4" />
                      <span>{appointment.vehicle}</span>
                      <span className="font-mono">({appointment.plate})</span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{appointment.location}</span>
                    </div>
                  </div>

                  {activeTab === "active" && appointment.status !== "completed" && (
                    <div className="mt-4 pt-4 border-t border-border flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-destructive border-destructive/20 hover:bg-destructive/10"
                      >
                        <XCircle className="w-4 h-4" />
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/appointments/${appointment.id}`);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
