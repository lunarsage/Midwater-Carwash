import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { Car, Plus } from "lucide-react";
import { AppBar } from "../../components/AppBar";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { ProgressStepper } from "../../components/ProgressStepper";

export function VehicleSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceId, date, time } = location.state || {};

  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);

  const steps = [
    { label: "Service", completed: true },
    { label: "Date", completed: true },
    { label: "Time", completed: true },
    { label: "Vehicle", completed: false },
    { label: "Confirm", completed: false },
  ];

  const vehicles = [
    { id: 1, make: "Tesla", model: "Model 3", color: "Midnight Silver", plate: "ABC 1234" },
    { id: 2, make: "Toyota", model: "Camry", color: "White", plate: "XYZ 5678" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppBar title="Select Vehicle" showBack />

      <div className="px-4 py-6 max-w-md mx-auto">
        <ProgressStepper steps={steps} currentStep={3} />

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-lg mb-2">Choose Your Vehicle</h2>
          <p className="text-muted-foreground text-sm">Which car would you like us to wash?</p>
        </motion.div>

        <div className="space-y-3 mb-4">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                onClick={() => setSelectedVehicle(vehicle.id)}
                hoverable
                className={`${
                  selectedVehicle === vehicle.id ? "ring-2 ring-primary" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 ${
                    selectedVehicle === vehicle.id ? "bg-primary" : "bg-secondary"
                  } rounded-xl flex items-center justify-center flex-shrink-0 transition-colors`}>
                    <Car className={`w-7 h-7 ${
                      selectedVehicle === vehicle.id ? "text-white" : "text-muted-foreground"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">{vehicle.make} {vehicle.model}</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>{vehicle.color}</p>
                      <p className="font-mono">{vehicle.plate}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/vehicles/add", { state: { returnTo: "/booking/vehicle" } })}
          >
            <Plus className="w-4 h-4" />
            Add New Vehicle
          </Button>
        </motion.div>

        <div className="fixed bottom-6 left-0 right-0 px-4">
          <div className="max-w-md mx-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              disabled={!selectedVehicle}
              onClick={() => navigate("/booking/confirm", { state: { serviceId, date, time, vehicleId: selectedVehicle } })}
            >
              Continue to Confirmation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
