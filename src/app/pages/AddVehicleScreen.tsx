import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { AppBar } from "../components/AppBar";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Card } from "../components/Card";

export function AddVehicleScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    color: "",
    plate: "",
    isDefault: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate("/vehicles");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppBar title="Add Vehicle" showBack />

      <div className="px-4 py-6 max-w-md mx-auto">
        <motion.form
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <Card>
            <div className="space-y-4">
              <Input
                label="Make"
                placeholder="e.g., Tesla, Toyota"
                value={formData.make}
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                required
              />

              <Input
                label="Model"
                placeholder="e.g., Model 3, Camry"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                required
              />

              <Input
                label="Color"
                placeholder="e.g., Midnight Silver"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                required
              />

              <Input
                label="License Plate"
                placeholder="ABC 1234"
                value={formData.plate}
                onChange={(e) => setFormData({ ...formData, plate: e.target.value.toUpperCase() })}
                required
              />

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="default"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                  className="w-5 h-5 rounded border-border accent-primary"
                />
                <label htmlFor="default" className="text-sm">
                  Set as default vehicle
                </label>
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
            >
              Add Vehicle
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
