import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Sparkles, Droplets, Star, Info } from "lucide-react";
import { AppBar } from "../components/AppBar";
import { BottomNav } from "../components/BottomNav";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { formatZar, SERVICE_PRICES } from "../data/site";

export function ServicesScreen() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      icon: Droplets,
      name: "Express Wash",
      price: SERVICE_PRICES.express,
      duration: "15 min",
      description: "Quick exterior wash and dry",
      features: ["Exterior wash", "Hand dry", "Tire shine"],
      color: "bg-blue-500"
    },
    {
      id: 2,
      icon: Sparkles,
      name: "Premium Wash",
      price: SERVICE_PRICES.premium,
      duration: "30 min",
      description: "Complete interior and exterior cleaning",
      features: ["Exterior wash", "Interior vacuum", "Dashboard clean", "Window cleaning", "Tire shine"],
      color: "bg-primary",
      popular: true
    },
    {
      id: 3,
      icon: Star,
      name: "Deluxe Detail",
      price: SERVICE_PRICES.deluxe,
      duration: "60 min",
      description: "Full professional detailing service",
      features: ["Everything in Premium", "Wax & polish", "Engine bay clean", "Deep interior detail", "Leather treatment"],
      color: "bg-warning"
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppBar title="Services" showBack />

      <div className="px-4 py-6 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl mb-2">Choose Your Service</h1>
          <p className="text-muted-foreground">Select the perfect wash for your car</p>
        </motion.div>

        <div className="space-y-4 mb-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                onClick={() => setSelectedService(service.id)}
                hoverable
                className={`relative ${
                  selectedService === service.id ? "ring-2 ring-primary" : ""
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    Popular
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg mb-1">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span className="text-primary text-lg">{formatZar(service.price)}</span>
                      <span>•</span>
                      <span>{service.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Includes:</span>
                  </div>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="fixed bottom-24 left-0 right-0 px-4 bg-background/80 backdrop-blur-sm py-4 border-t border-border"
        >
          <div className="max-w-md mx-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              disabled={!selectedService}
              onClick={() => navigate("/booking/date", { state: { serviceId: selectedService } })}
            >
              Continue to Booking
            </Button>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
