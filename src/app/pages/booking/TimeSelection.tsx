import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { Clock } from "lucide-react";
import { AppBar } from "../../components/AppBar";
import { Button } from "../../components/Button";
import { ProgressStepper } from "../../components/ProgressStepper";

export function TimeSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceId, date } = location.state || {};

  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const steps = [
    { label: "Service", completed: true },
    { label: "Date", completed: true },
    { label: "Time", completed: false },
    { label: "Vehicle", completed: false },
    { label: "Confirm", completed: false },
  ];

  const timeSlots = [
    { time: "9:00 AM", available: true },
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: false },
    { time: "12:00 PM", available: true },
    { time: "1:00 PM", available: true },
    { time: "2:00 PM", available: true },
    { time: "3:00 PM", available: false },
    { time: "4:00 PM", available: true },
    { time: "5:00 PM", available: true },
    { time: "6:00 PM", available: true },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppBar title="Select Time" showBack />

      <div className="px-4 py-6 max-w-md mx-auto">
        <ProgressStepper steps={steps} currentStep={2} />

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-lg mb-2">Available Time Slots</h2>
          <p className="text-muted-foreground text-sm">
            {new Date(date).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {timeSlots.map((slot, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 1, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: slot.available ? 0.95 : 1 }}
              onClick={() => slot.available && setSelectedTime(slot.time)}
              disabled={!slot.available}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedTime === slot.time
                  ? "border-primary bg-primary/10"
                  : slot.available
                  ? "border-border hover:border-primary/50 bg-card"
                  : "border-border bg-muted/50 cursor-not-allowed opacity-50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Clock className={`w-4 h-4 ${
                  selectedTime === slot.time ? "text-primary" : "text-muted-foreground"
                }`} />
                <span className={selectedTime === slot.time ? "text-primary" : ""}>
                  {slot.time}
                </span>
              </div>
              {!slot.available && (
                <p className="text-xs text-muted-foreground mt-1">Booked</p>
              )}
            </motion.button>
          ))}
        </div>

        {selectedTime && (
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 bg-accent border border-accent-foreground/10 rounded-xl mb-6"
          >
            <Clock className="w-5 h-5 text-accent-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Selected Time</p>
              <p className="text-accent-foreground">{selectedTime}</p>
            </div>
          </motion.div>
        )}

        <div className="fixed bottom-6 left-0 right-0 px-4">
          <div className="max-w-md mx-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              disabled={!selectedTime}
              onClick={() => navigate("/booking/vehicle", { state: { serviceId, date, time: selectedTime } })}
            >
              Continue to Vehicle Selection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
