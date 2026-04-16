import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { AppBar } from "../../components/AppBar";
import { Button } from "../../components/Button";
import { ProgressStepper } from "../../components/ProgressStepper";

export function DateSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const serviceId = location.state?.serviceId;

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth] = useState(new Date());

  const steps = [
    { label: "Service", completed: true },
    { label: "Date", completed: false },
    { label: "Time", completed: false },
    { label: "Vehicle", completed: false },
    { label: "Confirm", completed: false },
  ];

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const formatDate = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isPast = (day: number) => {
    const today = new Date();
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return checkDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppBar title="Select Date" showBack />

      <div className="px-4 py-6 max-w-md mx-auto">
        <ProgressStepper steps={steps} currentStep={1} />

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <button className="p-2 hover:bg-secondary rounded-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button className="p-2 hover:bg-secondary rounded-lg">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {getDaysInMonth().map((day, index) => {
              if (!day) {
                return <div key={index} />;
              }

              const dateStr = formatDate(day);
              const isSelected = selectedDate === dateStr;
              const isTodayDate = isToday(day);
              const isPastDate = isPast(day);

              return (
                <motion.button
                  key={index}
                  whileTap={{ scale: isPastDate ? 1 : 0.95 }}
                  onClick={() => !isPastDate && setSelectedDate(dateStr)}
                  disabled={isPastDate}
                  className={`aspect-square rounded-lg flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : isTodayDate
                      ? "border-2 border-primary text-primary"
                      : isPastDate
                      ? "text-muted-foreground/30 cursor-not-allowed"
                      : "hover:bg-secondary"
                  }`}
                >
                  {day}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {selectedDate && (
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 bg-accent border border-accent-foreground/10 rounded-xl mb-6"
          >
            <CalendarIcon className="w-5 h-5 text-accent-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Selected Date</p>
              <p className="text-accent-foreground">
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </motion.div>
        )}

        <div className="fixed bottom-6 left-0 right-0 px-4">
          <div className="max-w-md mx-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              disabled={!selectedDate}
              onClick={() => navigate("/booking/time", { state: { serviceId, date: selectedDate } })}
            >
              Continue to Time Selection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
