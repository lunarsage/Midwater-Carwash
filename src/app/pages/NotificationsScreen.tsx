import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Bell } from "lucide-react";
import { AppBar } from "../components/AppBar";
import { Card } from "../components/Card";
import { EmptyState } from "../components/EmptyState";
import { seedNotifications } from "../data/washSession";
import { useAuth } from "../auth/AuthContext";

export function NotificationsScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const notifications = user ? seedNotifications : [];

  return (
    <div className="min-h-screen bg-background">
      <AppBar title="Notifications" showBack />

      <div className="px-4 py-6 max-w-md mx-auto">
        {notifications.length === 0 ? (
          <EmptyState
            icon={Bell}
            title={user ? "No Notifications" : "Sign in to see updates"}
            description={
              user
                ? "You're all caught up! We'll notify you when there's something new."
                : "Booking updates and wash progress notifications appear here after you sign in."
            }
            actionLabel={user ? undefined : "Sign in"}
            onAction={user ? undefined : () => navigate("/login")}
          />
        ) : (
          <div className="space-y-3">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 1, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  hoverable={Boolean(notification.linkTo)}
                  onClick={() => {
                    if (notification.linkTo) navigate(notification.linkTo);
                  }}
                  className={`${!notification.read ? "border-primary/30 bg-primary/5" : ""} ${
                    notification.linkTo ? "cursor-pointer" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${notification.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <notification.icon className={`w-6 h-6 ${notification.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-sm">{notification.title}</h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                        {notification.linkTo && (
                          <span className="text-xs text-primary font-medium">Track wash →</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
