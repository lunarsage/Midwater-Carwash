import { useState } from "react";
import { useNavigate } from "react-router";
import { useRequireAdmin } from "../../auth/useRouteAuth";
import { motion } from "motion/react";
import { Calendar, Clock, Car, Search, Filter, CheckCircle, XCircle } from "lucide-react";
import { AppBar } from "../../components/AppBar";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { StatusBadge } from "../../components/StatusBadge";
import { Input } from "../../components/Input";

export function AdminAppointments() {
  const navigate = useNavigate();
  useRequireAdmin();
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "completed" | "cancelled">("all");

  const appointments = [
    {
      id: 1,
      customer: "Lerato Mokoena",
      service: "Premium Wash",
      date: "Apr 9, 2026",
      time: "2:00 PM",
      vehicle: "Tesla Model 3",
      plate: "ABC 1234",
      status: "pending" as const
    },
    {
      id: 2,
      customer: "Sarah Johnson",
      service: "Express Wash",
      date: "Apr 9, 2026",
      time: "3:00 PM",
      vehicle: "Toyota Camry",
      plate: "XYZ 5678",
      status: "approved" as const
    },
    {
      id: 3,
      customer: "Mike Wilson",
      service: "Deluxe Detail",
      date: "Apr 9, 2026",
      time: "4:00 PM",
      vehicle: "BMW 3 Series",
      plate: "DEF 9012",
      status: "pending" as const
    },
    {
      id: 4,
      customer: "Emma Davis",
      service: "Premium Wash",
      date: "Apr 8, 2026",
      time: "11:00 AM",
      vehicle: "Honda Accord",
      plate: "GHI 3456",
      status: "completed" as const
    },
  ];

  const filteredAppointments = filter === "all"
    ? appointments
    : appointments.filter(a => a.status === filter);

  const filters = [
    { label: "All", value: "all" as const },
    { label: "Pending", value: "pending" as const },
    { label: "Approved", value: "approved" as const },
    { label: "Completed", value: "completed" as const },
    { label: "Cancelled", value: "cancelled" as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AppBar title="Manage Appointments" showBack />

      <div className="px-4 py-6 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <Input
            placeholder="Search appointments..."
            icon={<Search className="w-4 h-4" />}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-6 overflow-x-auto pb-2"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                filter === f.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        <div className="space-y-4">
          {filteredAppointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="mb-2">{appointment.customer}</h3>
                    <StatusBadge status={appointment.status} />
                  </div>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <p className="text-muted-foreground">{appointment.service}</p>
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
                </div>

                {appointment.status === "pending" && (
                  <div className="flex gap-2 pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-destructive border-destructive/20 hover:bg-destructive/10"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
