import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Gift, Trophy, Star, Sparkles } from "lucide-react";
import { AppBar } from "../components/AppBar";
import { BottomNav } from "../components/BottomNav";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { useAuth } from "../auth/AuthContext";
import { EmptyState } from "../components/EmptyState";

export function LoyaltyScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <AppBar title="Loyalty" />

        <div className="px-4 py-6 max-w-md mx-auto space-y-4">
          <EmptyState
            icon={Trophy}
            title="Sign in to earn rewards"
            description="Loyalty progress and vouchers are tied to your account. Book washes to unlock rewards."
            actionLabel="Sign in"
            onAction={() => navigate("/login")}
          />

          <Card>
            <h3 className="mb-2">How it works</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Earn progress each time you wash at Midwater Carwash</li>
              <li>• Unlock free washes and discounts</li>
              <li>• Redeem vouchers in Services</li>
            </ul>
          </Card>
        </div>

        <BottomNav />
      </div>
    );
  }

  const rewards = [
    {
      id: 1,
      title: "Free Express Wash",
      points: 5,
      description: "Get a complimentary express wash",
      unlocked: true
    },
    {
      id: 2,
      title: "Free Premium Wash",
      points: 10,
      description: "Unlock a premium wash service",
      unlocked: false
    },
    {
      id: 3,
      title: "20% Off Deluxe Detail",
      points: 15,
      description: "Save on our deluxe detailing",
      unlocked: false
    },
  ];

  const vouchers = [
    { id: 1, code: "WASH2026", discount: "20% OFF", expiry: "Expires Apr 30, 2026" },
    { id: 2, code: "SPRING15", discount: "R 200 OFF", expiry: "Expires Apr 15, 2026" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppBar title="Loyalty" />

      <div className="px-4 py-6 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-br from-primary to-blue-600 text-white mb-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-white/80 text-sm mb-2">Your Progress</p>
                <h1 className="text-white text-3xl mb-1">3 of 5</h1>
                <p className="text-white/90">Washes completed</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between text-sm text-white/80 mb-2">
                <span>Progress to next reward</span>
                <span>60%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="bg-white h-full rounded-full"
                />
              </div>
            </div>

            <p className="text-sm text-white/80">
              2 more washes to unlock your next reward!
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h2 className="text-lg mb-4">Available Rewards</h2>
          <div className="space-y-3">
            {rewards.map((reward, index) => (
              <Card
                key={reward.id}
                className={`relative ${
                  reward.unlocked ? "border-success/30 bg-success/5" : ""
                }`}
              >
                {reward.unlocked && (
                  <div className="absolute -top-2 -right-2 bg-success text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Unlocked
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 ${
                    reward.unlocked ? "bg-success" : "bg-secondary"
                  } rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Gift className={`w-7 h-7 ${
                      reward.unlocked ? "text-white" : "text-muted-foreground"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">{reward.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {reward.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-sm">{reward.points} washes required</span>
                    </div>
                  </div>
                </div>

                {reward.unlocked && (
                  <div className="mt-4">
                    <Button variant="primary" size="sm" className="w-full">
                      Redeem Now
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg mb-4">Active Vouchers</h2>
          <div className="space-y-3">
            {vouchers.map((voucher) => (
              <Card key={voucher.id} className="border-2 border-dashed border-primary/30 bg-primary/5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl text-primary mb-1">{voucher.discount}</p>
                    <p className="text-sm text-muted-foreground mb-2 font-mono">{voucher.code}</p>
                    <p className="text-xs text-muted-foreground">{voucher.expiry}</p>
                  </div>
                  <Button size="sm" onClick={() => navigate("/services")}>
                    Use Now
                  </Button>
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
