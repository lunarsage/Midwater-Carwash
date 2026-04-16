import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Bell, MapPin, Moon, Settings as SettingsIcon } from "lucide-react";

import { AppBar } from "../../components/AppBar";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { EmptyState } from "../../components/EmptyState";
import { useAuth } from "../../auth/AuthContext";
import { SITE } from "../../data/site";

export function SettingsScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  const [location, setLocation] = useState(SITE.area);
  const [darkMode, setDarkMode] = useState(false);

  const notificationSummary = useMemo(() => {
    const enabled = [
      emailNotifications ? "Email" : null,
      smsNotifications ? "SMS" : null,
      pushNotifications ? "Push" : null,
    ].filter(Boolean);
    return enabled.length ? enabled.join(", ") : "Off";
  }, [emailNotifications, smsNotifications, pushNotifications]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <AppBar title="Settings" showBack />
        <div className="px-4 py-6 max-w-md mx-auto">
          <EmptyState
            icon={SettingsIcon}
            title="Sign in to manage settings"
            description="Settings are linked to your account."
            actionLabel="Sign in"
            onAction={() => navigate("/login")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppBar title="Settings" showBack />

      <div className="px-4 py-6 max-w-md mx-auto space-y-4">
        <motion.div initial={{ opacity: 1, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <div className="flex items-center gap-2 mb-1">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-lg">Notifications</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Choose how you want to receive updates. Currently: {notificationSummary}.
            </p>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm">Email</p>
                  <p className="text-xs text-muted-foreground">Receipts and booking updates</p>
                </div>
                <Button
                  variant={emailNotifications ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setEmailNotifications((v) => !v)}
                >
                  {emailNotifications ? "On" : "Off"}
                </Button>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm">SMS</p>
                  <p className="text-xs text-muted-foreground">Time-sensitive reminders</p>
                </div>
                <Button
                  variant={smsNotifications ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setSmsNotifications((v) => !v)}
                >
                  {smsNotifications ? "On" : "Off"}
                </Button>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm">Push</p>
                  <p className="text-xs text-muted-foreground">Wash progress and promos</p>
                </div>
                <Button
                  variant={pushNotifications ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setPushNotifications((v) => !v)}
                >
                  {pushNotifications ? "On" : "Off"}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 1, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-lg">Location</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Default branch: {SITE.shortLocation}
            </p>
            <Input
              label="Preferred area"
              value={location}
              onChange={(e) => setLocation(e.currentTarget.value)}
              placeholder="Aerorand"
            />
            <div className="mt-3 flex gap-2">
              <Button variant="secondary" className="flex-1" onClick={() => setLocation(SITE.area)}>
                Reset
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => navigate("/profile")}>
                Done
              </Button>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 1, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <div className="flex items-center gap-2 mb-1">
              <Moon className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-lg">Appearance</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Dark mode is a placeholder in this prototype.
            </p>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm">Dark mode</p>
                <p className="text-xs text-muted-foreground">{darkMode ? "On" : "Off"}</p>
              </div>
              <Button
                variant={darkMode ? "primary" : "outline"}
                size="sm"
                onClick={() => setDarkMode((v) => !v)}
              >
                {darkMode ? "On" : "Off"}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
