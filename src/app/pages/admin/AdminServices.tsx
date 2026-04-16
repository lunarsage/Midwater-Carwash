import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search, Clock, Power, Sparkles } from "lucide-react";

import { useRequireAdmin } from "../../auth/useRouteAuth";
import { AppBar } from "../../components/AppBar";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { formatZar } from "../../data/site";
import { ADMIN_SERVICES_SEED } from "../../data/adminSeed";

type Service = {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
  active: boolean;
};

export function AdminServices() {
  useRequireAdmin();

  const [query, setQuery] = useState("");
  const [services, setServices] = useState<Service[]>(
    ADMIN_SERVICES_SEED.map((s) => ({ ...s }))
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return services;
    return services.filter((s) => s.name.toLowerCase().includes(q));
  }, [query, services]);

  const activeCount = useMemo(
    () => services.filter((s) => s.active).length,
    [services]
  );

  return (
    <div className="min-h-screen bg-background">
      <AppBar title="Manage Services" showBack />

      <div className="px-4 py-6 max-w-md mx-auto">
        <motion.div initial={{ opacity: 1, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Input
            placeholder="Search services…"
            icon={<Search className="w-4 h-4" />}
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="grid grid-cols-2 gap-3 my-6"
        >
          <Card>
            <p className="text-xs text-muted-foreground mb-1">Total</p>
            <p className="text-2xl">{services.length}</p>
          </Card>
          <Card>
            <p className="text-xs text-muted-foreground mb-1">Active</p>
            <p className="text-2xl">{activeCount}</p>
          </Card>
        </motion.div>

        <div className="space-y-3">
          {filtered.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 1, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={service.active ? "" : "opacity-80"}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          service.active ? "bg-primary" : "bg-secondary"
                        }`}
                      >
                        <Sparkles
                          className={`w-5 h-5 ${
                            service.active ? "text-white" : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatZar(service.price)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <Clock className="w-4 h-4" />
                      <span>{service.durationMinutes} min</span>
                    </div>
                  </div>

                  <Button
                    variant={service.active ? "outline" : "primary"}
                    size="sm"
                    onClick={() =>
                      setServices((prev) =>
                        prev.map((s) =>
                          s.id === service.id ? { ...s, active: !s.active } : s
                        )
                      )
                    }
                  >
                    <Power className="w-4 h-4" />
                    {service.active ? "Disable" : "Enable"}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
