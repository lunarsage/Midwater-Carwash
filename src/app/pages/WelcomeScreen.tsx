import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Droplets, Sparkles, Clock, Award } from "lucide-react";
import { Button } from "../components/Button";

export function WelcomeScreen() {
  const navigate = useNavigate();

  const features = [
    { icon: Droplets, title: "Premium Wash", description: "Professional cleaning service" },
    { icon: Clock, title: "Quick Service", description: "Book in just 2 minutes" },
    { icon: Award, title: "Loyalty Rewards", description: "Earn points with every wash" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ scale: 0.85, opacity: 1 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6"
        >
          <Sparkles className="w-10 h-10 text-primary" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl text-center mb-3"
        >
          Welcome to Midwater Carwash
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-center mb-12 max-w-sm"
        >
          Premium car wash service at your fingertips. Book, track, and earn rewards.
        </motion.p>

        <div className="space-y-4 mb-12 w-full max-w-sm">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="px-6 pb-8 space-y-3"
      >
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => navigate("/home")}
        >
          Continue as guest
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="w-full"
          onClick={() => navigate("/register")}
        >
          Get Started
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="w-full"
          onClick={() => navigate("/login")}
        >
          Already have an account? Sign In
        </Button>
      </motion.div>
    </div>
  );
}
