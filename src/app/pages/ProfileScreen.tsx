import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  User,
  Car,
  Bell,
  CreditCard,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
  Shield,
  LogIn,
  UserPlus,
} from "lucide-react";
import { AppBar } from "../components/AppBar";
import { BottomNav } from "../components/BottomNav";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { useAuth } from "../auth/AuthContext";

export function ProfileScreen() {
  const navigate = useNavigate();
  const { user, initials, logout } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <AppBar title="Profile" />

        <div className="px-4 py-6 max-w-md mx-auto">
          <motion.div initial={{ opacity: 1, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="mb-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-2xl font-medium">
                  G
                </div>
                <div>
                  <h2 className="text-xl mb-1">Welcome</h2>
                  <p className="text-muted-foreground text-sm">
                    Sign in to book washes, save vehicles, and earn rewards.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <div className="space-y-3 mb-8">
            <Button variant="primary" size="lg" className="w-full gap-2" onClick={() => navigate("/login")}>
              <LogIn className="w-5 h-5" />
              Sign in
            </Button>
            <Button variant="outline" size="lg" className="w-full gap-2" onClick={() => navigate("/register")}>
              <UserPlus className="w-5 h-5" />
              Create account
            </Button>
          </div>

          <motion.button
            initial={{ opacity: 1, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => navigate("/welcome")}
            className="w-full mb-4"
          >
            <Card hoverable className="flex items-center justify-between p-4">
              <span className="text-sm">About Midwater Carwash</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Card>
          </motion.button>

          <motion.button
            initial={{ opacity: 1, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onClick={() => navigate("/notifications")}
            className="w-full mb-4"
          >
            <Card hoverable className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                </div>
                <span>Notifications (preview)</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Card>
          </motion.button>

          <p className="text-center text-sm text-muted-foreground mt-8">Version 1.0.0</p>
        </div>

        <BottomNav />
      </div>
    );
  }

  const signedInMenuItems = [
    ...(user.role === "admin"
      ? [{ icon: Shield, label: "Staff / Admin dashboard", path: "/admin" } as const]
      : []),
    { icon: User, label: "Personal Information", path: "/profile/personal" },
    { icon: Car, label: "My Vehicles", path: "/vehicles" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: CreditCard, label: "Payment Methods", path: "/profile/payment" },
    { icon: Settings, label: "Settings", path: "/profile/settings" },
    { icon: HelpCircle, label: "Help & Support", path: "/profile/support" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppBar title="Profile" />

      <div className="px-4 py-6 max-w-md mx-auto">
        <motion.div initial={{ opacity: 1, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white text-2xl">
                {initials}
              </div>
              <div>
                <h2 className="text-xl mb-1">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground">
                  {user.phone ?? "Add phone in account settings"}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Loyalty Status</p>
                <p className="text-lg text-success">Gold Member</p>
                <p className="text-sm text-muted-foreground mt-1">3 washes this month</p>
              </div>
              <div className="text-right">
                <p className="text-3xl text-success">60%</p>
                <p className="text-xs text-muted-foreground">to next tier</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2 mb-6"
        >
          {signedInMenuItems.map((item, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 1, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              onClick={() => navigate(item.path)}
              className="w-full"
            >
              <Card hoverable className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Card>
            </motion.button>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 1, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <button
            onClick={() => {
              logout();
              navigate("/home");
            }}
            className="w-full"
          >
            <Card hoverable className="flex items-center justify-center gap-3 p-4 text-destructive">
              <LogOut className="w-5 h-5" />
              <span>Log out</span>
            </Card>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8 text-sm text-muted-foreground"
        >
          <p>Version 1.0.0</p>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
