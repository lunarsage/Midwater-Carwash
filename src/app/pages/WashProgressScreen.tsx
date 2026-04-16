import { useMemo } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { MapPin, Car, Clock, Sparkles, Check } from "lucide-react";
import { AppBar } from "../components/AppBar";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { SITE } from "../data/site";
import { EmptyState } from "../components/EmptyState";
import {
  WASH_STAGES,
  activeWashSession,
  getEstimatedCompletionTime,
  getWashProgressFraction,
} from "../data/washSession";
import { useAuth } from "../auth/AuthContext";

export function WashProgressScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const eta = useMemo(() => getEstimatedCompletionTime(), []);
  const etaLabel = useMemo(
    () =>
      eta.toLocaleTimeString("en-ZA", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    [eta]
  );
  const progress = getWashProgressFraction();
  const currentIndex = activeWashSession.currentStageIndex;

  if (!user) {
    return (
      <div className="min-h-screen bg-background pb-8">
        <AppBar title="Wash progress" showBack />
        <div className="px-4 py-6 max-w-md mx-auto">
          <EmptyState
            icon={Sparkles}
            title="Sign in to track your wash"
            description="Live wash progress and ETA are linked to your booking."
            actionLabel="Sign in"
            onAction={() => navigate("/login")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <AppBar title="Wash progress" showBack />

      <div className="px-4 py-6 max-w-md mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 1, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-br from-primary to-blue-600 text-white border-0">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/80 text-sm mb-0.5">Live · {activeWashSession.bookingRef}</p>
                <h2 className="text-lg font-medium leading-tight text-white">{activeWashSession.serviceName}</h2>
                <div className="flex items-center gap-2 mt-2 text-sm text-white/90">
                  <Car className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {activeWashSession.vehicleLabel} · {activeWashSession.plate}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-white/85">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>{SITE.businessName}, {SITE.fullLocation}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-black/15 p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-white/90">
                  <Clock className="w-4 h-4" />
                  Estimated ready
                </span>
                <span className="font-semibold tabular-nums">{etaLabel}</span>
              </div>
              <p className="text-xs text-white/75">
                About {activeWashSession.etaMinutesRemaining} minutes to go — we’ll notify you when it’s time to collect.
              </p>
            </div>
          </Card>
        </motion.div>

        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-3">Stages</h2>
          <div className="space-y-3">
            {WASH_STAGES.map((stage, index) => {
              const done = index < currentIndex;
              const current = index === currentIndex;
              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 1, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className={
                      current
                        ? "border-primary ring-1 ring-primary/30 bg-primary/5"
                        : done
                          ? "border-success/30 bg-success/5"
                          : ""
                    }
                  >
                    <div className="flex gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                          done
                            ? "bg-success border-success text-white"
                            : current
                              ? "border-primary text-primary bg-primary/10"
                              : "border-border text-muted-foreground"
                        }`}
                      >
                        {done ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <span className="text-sm font-medium">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base mb-0.5">{stage.title}</h3>
                        <p className="text-sm text-muted-foreground">{stage.funLine}</p>
                        {current && (
                          <p className="text-xs text-primary mt-2 font-medium">You are here →</p>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Overall progress</span>
            <span className="tabular-nums font-medium">{Math.round(progress * 100)}%</span>
          </div>
          <div className="h-3 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </div>

        <Button variant="outline" className="w-full" onClick={() => navigate("/notifications")}>
          Back to notifications
        </Button>
      </div>
    </div>
  );
}
