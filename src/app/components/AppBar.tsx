import { ArrowLeft, Bell } from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

interface AppBarProps {
  title?: string;
  showBack?: boolean;
  showNotifications?: boolean;
  actions?: React.ReactNode;
}

export function AppBar({ title, showBack = false, showNotifications = false, actions }: AppBarProps) {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 bg-card border-b border-border px-4 py-3 z-40">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
          )}
          {!showBack && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/home")}
              className="flex items-center gap-2 -ml-1 pr-2 py-1 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Go to home"
            >
              <img
                src="/logo.png"
                alt="Midwater Carwash"
                className="w-7 h-7 rounded-md object-contain bg-white/0"
                onError={(e) => {
                  // Hide the image if the file isn't present yet
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="text-sm font-medium">Midwater</span>
            </motion.button>
          )}
          {title && <h1 className="text-lg">{title}</h1>}
        </div>

        <div className="flex items-center gap-2">
          {actions}
          {showNotifications && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/notifications")}
              className="p-2 hover:bg-secondary rounded-lg transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"></span>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
