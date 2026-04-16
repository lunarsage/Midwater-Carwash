import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Clock, HelpCircle, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";

import { AppBar } from "../../components/AppBar";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { EmptyState } from "../../components/EmptyState";
import { useAuth } from "../../auth/AuthContext";
import { SITE } from "../../data/site";

export function SupportScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <AppBar title="Help & Support" showBack />
        <div className="px-4 py-6 max-w-md mx-auto">
          <EmptyState
            icon={HelpCircle}
            title="Sign in to contact support"
            description="Support messages are linked to your account."
            actionLabel="Sign in"
            onAction={() => navigate("/login")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppBar title="Help & Support" showBack />

      <div className="px-4 py-6 max-w-md mx-auto space-y-4">
        <motion.div initial={{ opacity: 1, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <h2 className="text-lg mb-2">Contact</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3 p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3 min-w-0">
                  <MessageCircle className="w-5 h-5 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="text-sm">WhatsApp</p>
                    <p className="text-xs text-muted-foreground truncate">+27 XX XXX XXXX</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => {}}>
                  Open
                </Button>
              </div>

              <div className="flex items-center justify-between gap-3 p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3 min-w-0">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="text-sm">Phone</p>
                    <p className="text-xs text-muted-foreground truncate">+27 XX XXX XXXX</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => {}}>
                  Call
                </Button>
              </div>

              <div className="flex items-center justify-between gap-3 p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3 min-w-0">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="text-sm">Email</p>
                    <p className="text-xs text-muted-foreground truncate">support@midwater.co.za</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => {}}>
                  Email
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 1, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card>
            <h2 className="text-lg mb-2">Hours & address</h2>
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
                <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="min-w-0">
                  <p className="text-sm">Hours</p>
                  <p className="text-xs text-muted-foreground">Mon–Sat: 08:00–17:00</p>
                  <p className="text-xs text-muted-foreground">Sun: 09:00–13:00</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="min-w-0">
                  <p className="text-sm">Address</p>
                  <p className="text-xs text-muted-foreground">{SITE.fullLocation}</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 1, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <h2 className="text-lg mb-3">Send a message</h2>
            <div className="space-y-3">
              <Input
                label="Subject"
                placeholder="Booking issue"
                value={subject}
                onChange={(e) => setSubject(e.currentTarget.value)}
              />
              <Input
                label="Message"
                placeholder="Tell us what happened…"
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
              />
              <Button
                className="w-full"
                onClick={() => {
                  setSubject("");
                  setMessage("");
                  navigate("/profile");
                }}
              >
                <Send className="w-4 h-4" />
                Send (prototype)
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Contact buttons are placeholders in this prototype.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
