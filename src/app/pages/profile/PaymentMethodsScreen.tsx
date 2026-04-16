import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { CreditCard, Plus, ShieldCheck } from "lucide-react";

import { AppBar } from "../../components/AppBar";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { EmptyState } from "../../components/EmptyState";
import { useAuth } from "../../auth/AuthContext";
import { SITE } from "../../data/site";

type PaymentMethod = {
  id: string;
  brand: string;
  last4: string;
  exp: string;
};

function safeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function PaymentMethodsScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [adding, setAdding] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <AppBar title="Payment methods" showBack />
        <div className="px-4 py-6 max-w-md mx-auto">
          <EmptyState
            icon={CreditCard}
            title="Sign in to add payment methods"
            description="Payment methods are linked to your account."
            actionLabel="Sign in"
            onAction={() => navigate("/login")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppBar title="Payment methods" showBack />

      <div className="px-4 py-6 max-w-md mx-auto space-y-4">
        <motion.div initial={{ opacity: 1, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-secondary/30">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Currency</p>
                <p className="text-lg">ZAR</p>
                <p className="text-xs text-muted-foreground">All payments are in South African Rand.</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4" />
                <span>Prototype only</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {methods.length === 0 && !adding && (
          <motion.div initial={{ opacity: 1, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <Card>
              <EmptyState
                icon={CreditCard}
                title="No payment methods yet"
                description="Add a card to speed up checkout on future bookings."
                actionLabel="Add payment method"
                onAction={() => adding ? null : setAdding(true)}
              />
            </Card>
          </motion.div>
        )}

        {adding && (
          <motion.div initial={{ opacity: 1, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <Card>
              <div className="flex items-center justify-between gap-3 mb-3">
                <h2 className="text-lg">Add card</h2>
                <Button variant="ghost" size="sm" onClick={() => setAdding(false)}>
                  Cancel
                </Button>
              </div>

              <div className="space-y-3">
                <Input
                  label="Card number"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.currentTarget.value)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Expiry"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.currentTarget.value)}
                  />
                  <Input
                    label="CVC"
                    placeholder="123"
                    value={cvc}
                    onChange={(e) => setCvc(e.currentTarget.value)}
                  />
                </div>

                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => {
                    const last4 = cardNumber.replace(/\s/g, "").slice(-4) || "0000";
                    setMethods((prev) => [
                      { id: safeId(), brand: "Visa", last4, exp: expiry || "MM/YY" },
                      ...prev,
                    ]);
                    setAdding(false);
                    setCardNumber("");
                    setExpiry("");
                    setCvc("");
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Save card (prototype)
                </Button>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                This is a prototype flow. Don’t enter real card details.
              </p>
            </Card>
          </motion.div>
        )}

        {methods.length > 0 && (
          <motion.div initial={{ opacity: 1, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <Card>
              <h2 className="text-lg mb-3">Saved cards</h2>
              <div className="space-y-2">
                {methods.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between gap-3 p-3 border border-border rounded-lg"
                  >
                    <div>
                      <p className="text-sm">{m.brand} •••• {m.last4}</p>
                      <p className="text-xs text-muted-foreground">Expires {m.exp}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setMethods((all) => all.filter((x) => x.id !== m.id))}>
                      Remove
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="secondary" className="flex-1" onClick={() => setAdding(true)}>
                  Add another
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => navigate("/profile")}>
                  Done
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <Card className="bg-secondary/30">
            <p className="text-xs text-muted-foreground">
              {SITE.businessName} · {SITE.fullLocation}
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

/*
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { CreditCard, Plus, ShieldCheck } from "lucide-react";

import { AppBar } from "../../components/AppBar";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { EmptyState } from "../../components/EmptyState";
import { useAuth } from "../../auth/AuthContext";
import { SITE } from "../../data/site";

type PaymentMethod = {
  id: string;
  brand: "Visa" | "Mastercard";
  last4: string;
  exp: string;
  isDefault?: boolean;
};

export function PaymentMethodsScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const currencyInfo = useMemo(() => "ZAR (South African Rand)", []);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <AppBar title="Payment methods" showBack />
        <div className="px-4 py-6 max-w-md mx-auto">
          <EmptyState
            icon={CreditCard}
            title="Sign in to add payment methods"
            description="Save a card to speed up future bookings."
            actionLabel="Sign in"
            onAction={() => navigate("/login")}
          />
        </div>
      </div>
    );
  }

  const hasMethods = methods.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <AppBar title="Payment methods" showBack />

      <div className="px-4 py-6 max-w-md mx-auto space-y-4">
        <motion.div initial={{ opacity: 1, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-secondary/30">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">Currency</p>
                <p className="text-lg">ZAR</p>
                <p className="text-xs text-muted-foreground">
                  All payments are in {currencyInfo}.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4" />
                <span>Prototype only</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {!hasMethods && !isAdding && (
          <motion.div initial={{ opacity: 1, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <Card>
              <EmptyState
                icon={CreditCard}
                title="No payment methods yet"
                description="Add a card to make checkout faster next time."
                actionLabel="Add payment method"
                onAction={() => setIsAdding(true)}
              />
            </Card>
          </motion.div>
        )}

        {isAdding && (
          <motion.div initial={{ opacity: 1, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <Card>
              <div className="flex items-center justify-between gap-3 mb-3">
                <h2 className="text-lg">Add card</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
              </div>

              <div className="space-y-3">
                <Input
                  label="Card number"
                  inputMode="numeric"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.currentTarget.value)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Expiry"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.currentTarget.value)}
                  />
                  <Input
                    label="CVC"
                    inputMode="numeric"
                    placeholder="123"
                    value={cvc}
                    onChange={(e) => setCvc(e.currentTarget.value)}
                  />
                </div>

                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => {
                    const next: PaymentMethod = {
                      id: crypto.randomUUID(),
                      brand: "Visa",
                      last4: (cardNumber.replace(/\s/g, "").slice(-4) || "0000").padStart(4, "0"),
                      exp: expiry || "MM/YY",
                      isDefault: methods.length === 0,
                    };
                    setMethods((m) => [next, ...m]);
                    setIsAdding(false);
                    setCardNumber("");
                    setExpiry("");
                    setCvc("");
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Save card (prototype)
                </Button>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                This is a UI prototype. Don’t enter real card details.
              </p>
            </Card>
          </motion.div>
        )}

        {hasMethods && (
          <motion.div initial={{ opacity: 1, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <Card>
              <h2 className="text-lg mb-3">Saved cards</h2>
              <div className="space-y-2">
                {methods.map((m) => (
                  <div key={m.id} className="flex items-center justify-between gap-3 p-3 border border-border rounded-lg">
                    <div className="min-w-0">
                      <p className="text-sm">
                        {m.brand} •••• {m.last4} {m.isDefault ? <span className="text-xs text-muted-foreground">(Default)</span> : null}
                      </p>
                      <p className="text-xs text-muted-foreground">Expires {m.exp}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMethods((all) => all.filter((x) => x.id !== m.id))}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="secondary" className="flex-1" onClick={() => setIsAdding(true)}>
                  Add another
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => navigate("/profile")}>
                  Done
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <Card className="bg-secondary/30">
            <p className="text-xs text-muted-foreground">
              {SITE.businessName} · {SITE.fullLocation}
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
*/

