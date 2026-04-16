import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Car, Plus, Edit, Trash2 } from "lucide-react";
import { AppBar } from "../components/AppBar";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { EmptyState } from "../components/EmptyState";

export function VehiclesScreen() {
  const navigate = useNavigate();
  const [vehicles] = useState([
    { id: 1, make: "Tesla", model: "Model 3", color: "Midnight Silver", plate: "ABC 1234", isDefault: true },
    { id: 2, make: "Toyota", model: "Camry", color: "White", plate: "XYZ 5678", isDefault: false },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <AppBar title="My Vehicles" showBack />

      <div className="px-4 py-6 max-w-md mx-auto">
        {vehicles.length === 0 ? (
          <EmptyState
            icon={Car}
            title="No Vehicles"
            description="Add your first vehicle to get started with bookings"
            actionLabel="Add Vehicle"
            onAction={() => navigate("/vehicles/add")}
          />
        ) : (
          <>
            <motion.div
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <Button
                variant="primary"
                className="w-full"
                onClick={() => navigate("/vehicles/add")}
              >
                <Plus className="w-4 h-4" />
                Add New Vehicle
              </Button>
            </motion.div>

            <div className="space-y-3">
              {vehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 1, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={vehicle.isDefault ? "border-primary/30 bg-primary/5" : ""}>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Car className="w-7 h-7 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="mb-1">{vehicle.make} {vehicle.model}</h3>
                            {vehicle.isDefault && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground mb-4">
                          <p>{vehicle.color}</p>
                          <p className="font-mono">{vehicle.plate}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => navigate(`/vehicles/edit/${vehicle.id}`)}
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-destructive border-destructive/20 hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
