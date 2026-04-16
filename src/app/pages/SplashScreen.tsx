import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Droplets } from "lucide-react";

export function SplashScreen() {
  const navigate = useNavigate();
  const [logoOk, setLogoOk] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-blue-600 to-blue-700 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.92, opacity: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm"
        >
          <img
            src="/logo.png"
            alt="Midwater Carwash"
            className="w-14 h-14 object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
              setLogoOk(false);
            }}
          />
          {!logoOk && <Droplets className="w-12 h-12 text-white" />}
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white text-3xl mb-2"
        >
          Midwater Carwash
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/80"
        >
          Premium Car Wash Service
        </motion.p>
      </motion.div>
    </div>
  );
}
