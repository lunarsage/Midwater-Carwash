import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { CheckCircle2, Calendar, Home } from "lucide-react";
import { Button } from "../../components/Button";

export function BookingSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0.92 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="w-24 h-24 bg-success rounded-full flex items-center justify-center mb-6"
      >
        <CheckCircle2 className="w-16 h-16 text-white" />
      </motion.div>

      <motion.div
        initial={{ opacity: 1, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl mb-3">Booking Confirmed!</h1>
        <p className="text-muted-foreground max-w-sm">
          Your car wash has been scheduled. We've sent a confirmation to your email.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 1, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-sm space-y-3"
      >
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => navigate("/appointments")}
        >
          <Calendar className="w-4 h-4" />
          View Appointment
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full"
          onClick={() => navigate("/home")}
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Button>
      </motion.div>
    </div>
  );
}
