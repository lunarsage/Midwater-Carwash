import { motion } from "motion/react";
import { useRequireAdmin } from "../../auth/useRouteAuth";
import { TrendingUp, DollarSign, Users, Sparkles } from "lucide-react";
import { AppBar } from "../../components/AppBar";
import { Card } from "../../components/Card";
import { ADMIN_TOTAL_REVENUE, ADMIN_WEEKLY_REVENUE } from "../../data/adminSeed";
import { formatZar } from "../../data/site";

export function AdminAnalytics() {
  useRequireAdmin();

  const metrics = [
    { label: "Total Revenue", value: formatZar(ADMIN_TOTAL_REVENUE), change: "+15%", icon: DollarSign, color: "text-success" },
    { label: "Total Bookings", value: "342", change: "+23%", icon: Sparkles, color: "text-primary" },
    { label: "Active Users", value: "1,234", change: "+8%", icon: Users, color: "text-warning" },
    { label: "Completion Rate", value: "94%", change: "+2%", icon: TrendingUp, color: "text-completed" },
  ];

  const popularServices = [
    { name: "Premium Wash", count: 156, percentage: 46 },
    { name: "Express Wash", count: 124, percentage: 36 },
    { name: "Deluxe Detail", count: 62, percentage: 18 },
  ];

  const revenueByDay = ADMIN_WEEKLY_REVENUE;

  const maxRevenue = Math.max(...revenueByDay.map(d => d.amount));

  return (
    <div className="min-h-screen bg-background">
      <AppBar title="Analytics" showBack />

      <div className="px-4 py-6 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          {metrics.map((metric, index) => (
            <Card key={index}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 ${metric.color === "text-success" ? "bg-success" : metric.color === "text-primary" ? "bg-primary" : metric.color === "text-warning" ? "bg-warning" : "bg-completed"} rounded-lg flex items-center justify-center`}>
                  <metric.icon className="w-5 h-5 text-white" />
                </div>
                <span className={`text-xs ${metric.color}`}>{metric.change}</span>
              </div>
              <p className="text-2xl mb-1">{metric.value}</p>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
            </Card>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h2 className="text-lg mb-4">Revenue This Week</h2>
          <Card>
            <div className="flex items-end justify-between gap-2 h-48">
              {revenueByDay.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="flex-1 w-full flex items-end">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.amount / maxRevenue) * 100}%` }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                      className="w-full bg-primary rounded-t-lg relative group"
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {formatZar(day.amount)}
                      </div>
                    </motion.div>
                  </div>
                  <span className="text-xs text-muted-foreground">{day.day}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg mb-4">Popular Services</h2>
          <Card>
            <div className="space-y-4">
              {popularServices.map((service, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{service.name}</span>
                    <span className="text-sm text-muted-foreground">{service.count} bookings</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${service.percentage}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      className="bg-primary h-full rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
