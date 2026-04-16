import { useNavigate } from "react-router";
import { useRequireAdmin } from "../../auth/useRouteAuth";
import { motion } from "motion/react";
import { Calendar, Users, Sparkles, TrendingUp, DollarSign, Clock } from "lucide-react";
import { Card } from "../../components/Card";
import { useAuth } from "../../auth/AuthContext";

export function AdminHome() {
  const navigate = useNavigate();
  useRequireAdmin();
  const { greetingName, user } = useAuth();

  const stats = [
    { icon: Calendar, label: "Today's Bookings", value: "12", color: "bg-primary", change: "+3" },
    { icon: Users, label: "Active Users", value: "1,234", color: "bg-success", change: "+45" },
    { icon: DollarSign, label: "Revenue (Today)", value: "R 7 200", color: "bg-warning", change: "+R 1 200" },
    { icon: Sparkles, label: "Services Completed", value: "8", color: "bg-completed", change: "+2" },
  ];

  const quickActions = [
    { icon: Calendar, label: "Manage Bookings", color: "bg-primary", path: "/admin/appointments" },
    { icon: Sparkles, label: "Manage Services", color: "bg-success", path: "/admin/services" },
    { icon: Users, label: "View Users", color: "bg-warning", path: "/admin/users" },
    { icon: TrendingUp, label: "Analytics", color: "bg-completed", path: "/admin/analytics" },
  ];

  const recentBookings = [
    { id: 1, customer: "John Doe", service: "Premium Wash", time: "2:00 PM", status: "pending" as const },
    { id: 2, customer: "Jane Smith", service: "Express Wash", time: "3:00 PM", status: "approved" as const },
    { id: 3, customer: "Bob Johnson", service: "Deluxe Detail", time: "4:00 PM", status: "pending" as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary to-blue-600 text-white px-4 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl mb-2">Admin Dashboard</h1>
          <p className="text-white/80">
            Welcome back{user?.name ? `, ${greetingName}` : ""}
          </p>
          {user?.email && (
            <p className="text-white/60 text-sm mt-1">{user.email}</p>
          )}
        </div>
      </div>

      <div className="px-4 py-6 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-3 mb-6 -mt-16"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="relative">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-success">{stat.change}</span>
              </div>
              <p className="text-2xl mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h2 className="text-lg mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                onClick={() => navigate(action.path)}
                hoverable
                className="flex flex-col items-center gap-3 p-4"
              >
                <div className={`w-14 h-14 ${action.color} rounded-xl flex items-center justify-center`}>
                  <action.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm text-center">{action.label}</span>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg">Recent Bookings</h2>
            <button
              onClick={() => navigate("/admin/appointments")}
              className="text-sm text-primary hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <Card key={booking.id} hoverable onClick={() => navigate(`/admin/appointments/${booking.id}`)}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="mb-1">{booking.customer}</h3>
                    <p className="text-sm text-muted-foreground">{booking.service}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Clock className="w-4 h-4" />
                      <span>{booking.time}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      booking.status === "approved"
                        ? "bg-success/10 text-success"
                        : "bg-warning/10 text-warning"
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
