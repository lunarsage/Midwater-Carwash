import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Car, Clock, Sparkles, Droplets, MapPin } from "lucide-react";
import { AppBar } from "../components/AppBar";
import { BottomNav } from "../components/BottomNav";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { SITE, formatZar, SERVICE_PRICES } from "../data/site";
import { activeWashSession, WASH_STAGES } from "../data/washSession";
import { useAuth } from "../auth/AuthContext";

export function HomeScreen() {
  const navigate = useNavigate();
  const { user, greetingName } = useAuth();
  const helloName = user ? greetingName : "Hi";

  const quickActions = user
    ? [
        { icon: Car, label: "Book Wash", color: "bg-primary", path: "/services" },
        { icon: Clock, label: "Bookings", color: "bg-success", path: "/appointments" },
        { icon: Sparkles, label: "Loyalty", color: "bg-warning", path: "/loyalty" },
      ]
    : [{ icon: Car, label: "Services", color: "bg-primary", path: "/services" }];

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppBar showNotifications />

      <div className="px-4 py-6 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl mb-1">Hello, {helloName}! 👋</h1>
          <p className="text-muted-foreground">Ready to make your car shine?</p>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            {SITE.businessName} · {SITE.shortLocation}, {SITE.province}
          </p>
        </motion.div>

        {!user && (
          <motion.div
            initial={{ opacity: 1, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card className="border-primary/25 bg-primary/5">
              <p className="text-sm text-muted-foreground mb-3">
                Browse services and pricing. Sign in when you’re ready to book.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="primary" size="sm" className="flex-1" onClick={() => navigate("/login")}>
                  Sign in
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate("/register")}>
                  Create account
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          {quickActions.map((action, index) => (
            <Card
              key={index}
              onClick={() => navigate(action.path)}
              hoverable
              className="flex flex-col items-center gap-3 p-4"
            >
              <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-center">{action.label}</span>
            </Card>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3 mb-6"
        >
          {user && (
            <Card className="bg-gradient-to-br from-info/90 to-primary text-white border-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-white/85 text-sm mb-1 flex items-center gap-2">
                    <Droplets className="w-4 h-4" />
                    Wash in progress
                  </p>
                  <h3 className="text-white text-lg mb-1">{activeWashSession.serviceName}</h3>
                  <p className="text-sm text-white/90">
                    {WASH_STAGES[activeWashSession.currentStageIndex]?.title ?? "Live"} · {activeWashSession.plate}
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1 bg-white text-primary hover:bg-white/90"
                  onClick={() => navigate("/wash-progress")}
                >
                  Track live
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-white/40 text-white hover:bg-white/10"
                  onClick={() => navigate("/appointments")}
                >
                  Bookings
                </Button>
              </div>
            </Card>
          )}
        </motion.div>

        {user && (
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg">Loyalty Progress</h2>
              <button
                onClick={() => navigate("/loyalty")}
                className="text-sm text-primary hover:underline"
              >
                View All
              </button>
            </div>
            <Card>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Next Reward</p>
                  <h3>3 of 5 washes</h3>
                </div>
                <div className="text-right">
                  <p className="text-2xl text-primary">60%</p>
                </div>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="bg-primary h-full rounded-full"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                2 more washes to unlock a free Premium Wash!
              </p>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-lg mb-4">Popular Services</h2>
          <div className="space-y-3">
            {[
              { name: "Express Wash", price: formatZar(SERVICE_PRICES.express), duration: "15 min" },
              { name: "Premium Wash", price: formatZar(SERVICE_PRICES.premium), duration: "30 min" },
              { name: "Deluxe Detail", price: formatZar(SERVICE_PRICES.deluxe), duration: "60 min" },
            ].map((service, index) => (
              <Card
                key={index}
                onClick={() => navigate("/services")}
                hoverable
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="mb-1">{service.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{service.price}</span>
                      <span>•</span>
                      <span>{service.duration}</span>
                    </div>
                  </div>
                  <Button size="sm">Book</Button>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
