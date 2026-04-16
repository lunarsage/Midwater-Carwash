import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { Calendar, Clock, Car, Sparkles, Tag } from "lucide-react";
import { AppBar } from "../../components/AppBar";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { ProgressStepper } from "../../components/ProgressStepper";
import { formatZar, servicePriceById } from "../../data/site";

export function BookingConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceId, date, time, vehicleId } = location.state || {};
  const [loading, setLoading] = useState(false);

  const steps = [
    { label: "Service", completed: true },
    { label: "Date", completed: true },
    { label: "Time", completed: true },
    { label: "Vehicle", completed: true },
    { label: "Confirm", completed: false },
  ];

  const price = servicePriceById(serviceId);
  const bookingDetails = {
    service: "Premium Wash",
    price,
    date: date
      ? new Date(date).toLocaleDateString("en-ZA", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })
      : "—",
    time: time ?? "—",
    vehicle: "Tesla Model 3",
    plate: "MP 12 AB GP",
    loyaltyDiscount: 30,
  };

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/booking/success");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppBar title="Confirm Booking" showBack />

      <div className="px-4 py-6 max-w-md mx-auto">
        <ProgressStepper steps={steps} currentStep={4} />

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-lg mb-2">Review Your Booking</h2>
          <p className="text-muted-foreground text-sm">Please confirm your details before proceeding</p>
        </motion.div>

        <div className="space-y-4 mb-6">
          <Card>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1">{bookingDetails.service}</h3>
                <p className="text-2xl text-primary">{formatZar(bookingDetails.price)}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p>{bookingDetails.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p>{bookingDetails.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                  <Car className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vehicle</p>
                  <p>{bookingDetails.vehicle}</p>
                  <p className="text-sm text-muted-foreground font-mono">{bookingDetails.plate}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-success/5 border-success/20">
            <div className="flex items-center gap-3">
              <Tag className="w-5 h-5 text-success" />
              <div className="flex-1">
                <p className="text-sm">Loyalty Discount Applied</p>
                <p className="text-success">−{formatZar(bookingDetails.loyaltyDiscount)}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground mb-1">Total Amount</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl text-primary">
                    {formatZar(bookingDetails.price - bookingDetails.loyaltyDiscount)}
                  </p>
                  {bookingDetails.loyaltyDiscount > 0 && (
                    <p className="text-sm text-muted-foreground line-through">
                      {formatZar(bookingDetails.price)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="fixed bottom-6 left-0 right-0 px-4">
          <div className="max-w-md mx-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleConfirm}
              loading={loading}
            >
              Confirm & Pay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
