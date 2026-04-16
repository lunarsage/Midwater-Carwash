import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search, Mail, Shield, UserCheck, UserX, Users } from "lucide-react";

import { useRequireAdmin } from "../../auth/useRouteAuth";
import { AppBar } from "../../components/AppBar";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { ADMIN_USERS_SEED } from "../../data/adminSeed";

type UserRole = "admin" | "staff" | "customer";
type UserStatus = "active" | "suspended";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
};

export function AdminUsers() {
  useRequireAdmin();

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<AdminUser[]>(
    ADMIN_USERS_SEED.map((u) => ({ ...u }))
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      `${u.name} ${u.email} ${u.role} ${u.status}`.toLowerCase().includes(q)
    );
  }, [query, users]);

  const counts = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.status === "active").length;
    const suspended = users.filter((u) => u.status === "suspended").length;
    const admins = users.filter((u) => u.role === "admin").length;
    return { total, active, suspended, admins };
  }, [users]);

  return (
    <div className="min-h-screen bg-background">
      <AppBar title="Users" showBack />

      <div className="px-4 py-6 max-w-md mx-auto">
        <motion.div initial={{ opacity: 1, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Input
            placeholder="Search users…"
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
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-muted-foreground">Total</span>
            </div>
            <p className="text-2xl mb-1">{counts.total}</p>
            <p className="text-xs text-muted-foreground">Users</p>
          </Card>

          <Card>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-muted-foreground">Active</span>
            </div>
            <p className="text-2xl mb-1">{counts.active}</p>
            <p className="text-xs text-muted-foreground">Accounts</p>
          </Card>

          <Card>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
                <UserX className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-muted-foreground">Suspended</span>
            </div>
            <p className="text-2xl mb-1">{counts.suspended}</p>
            <p className="text-xs text-muted-foreground">Accounts</p>
          </Card>

          <Card>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-completed rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-muted-foreground">Admins</span>
            </div>
            <p className="text-2xl mb-1">{counts.admins}</p>
            <p className="text-xs text-muted-foreground">Privileged</p>
          </Card>
        </motion.div>

        <div className="space-y-3">
          {filtered.map((u, index) => (
            <motion.div
              key={u.id}
              initial={{ opacity: 1, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="truncate">{u.name}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          u.status === "active"
                            ? "bg-success/10 text-success"
                            : "bg-warning/10 text-warning"
                        }`}
                      >
                        {u.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{u.email}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Role:{" "}
                      <span className="text-foreground">
                        {u.role === "admin"
                          ? "Admin"
                          : u.role === "staff"
                            ? "Staff"
                            : "Customer"}
                      </span>
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className={
                      u.status === "active"
                        ? "text-warning border-warning/20 hover:bg-warning/10"
                        : ""
                    }
                    onClick={() =>
                      setUsers((prev) =>
                        prev.map((x) =>
                          x.id === u.id
                            ? {
                                ...x,
                                status:
                                  x.status === "active" ? "suspended" : "active",
                              }
                            : x
                        )
                      )
                    }
                  >
                    {u.status === "active" ? "Suspend" : "Restore"}
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

/*
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Users, Shield, UserCheck, UserX, Search, Mail } from "lucide-react";
import { useRequireAdmin } from "../../auth/useRouteAuth";
import { AppBar } from "../../components/AppBar";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

type UserRole = "admin" | "staff" | "customer";
type UserStatus = "active" | "suspended";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
};

export function AdminUsers() {
  useRequireAdmin();

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<AdminUser[]>([
    { id: "u_1", name: "Lerato Mokoena", email: "lerato.mokoena@example.com", role: "admin", status: "active" },
    { id: "u_2", name: "Sarah Johnson", email: "sarah.johnson@example.com", role: "staff", status: "active" },
    { id: "u_3", name: "Mike Wilson", email: "mike.wilson@example.com", role: "staff", status: "suspended" },
    { id: "u_4", name: "Emma Davis", email: "emma.davis@example.com", role: "customer", status: "active" },
    { id: "u_5", name: "Thabo Nkosi", email: "thabo.nkosi@example.com", role: "customer", status: "active" },
    { id: "u_6", name: "Aisha Patel", email: "aisha.patel@example.com", role: "customer", status: "suspended" },
  ]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => `${u.name} ${u.email} ${u.role} ${u.status}`.toLowerCase().includes(q));
  }, [query, users]);

  const counts = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.status === "active").length;
    const suspended = users.filter((u) => u.status === "suspended").length;
    const admins = users.filter((u) => u.role === "admin").length;
    return { total, active, suspended, admins };
  }, [users]);

  function toggleSuspend(id: string) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u
      )
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppBar title="Users" showBack />

      <div className="px-4 py-6 max-w-md mx-auto">
        <motion.div initial={{ opacity: 1, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <Input
            placeholder="Search users..."
            icon={<Search className="w-4 h-4" />}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          <Card>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-muted-foreground">Total</span>
            </div>
            <p className="text-2xl mb-1">{counts.total}</p>
            <p className="text-xs text-muted-foreground">Users</p>
          </Card>
          <Card>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-muted-foreground">Active</span>
            </div>
            <p className="text-2xl mb-1">{counts.active}</p>
            <p className="text-xs text-muted-foreground">Accounts</p>
          </Card>
          <Card>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
                <UserX className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-muted-foreground">Suspended</span>
            </div>
            <p className="text-2xl mb-1">{counts.suspended}</p>
            <p className="text-xs text-muted-foreground">Accounts</p>
          </Card>
          <Card>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-completed rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-muted-foreground">Admins</span>
            </div>
            <p className="text-2xl mb-1">{counts.admins}</p>
            <p className="text-xs text-muted-foreground">Privileged</p>
          </Card>
        </motion.div>

        <div className="space-y-4">
          {filtered.map((u, index) => (
            <motion.div
              key={u.id}
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="truncate">{u.name}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          u.status === "active" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                        }`}
                      >
                        {u.status}
                      </span>
                    </div>

                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{u.email}</span>
                      </div>
                      <p className="text-xs">
                        Role:{" "}
                        <span className="text-foreground">
                          {u.role === "admin" ? "Admin" : u.role === "staff" ? "Staff" : "Customer"}
                        </span>
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleSuspend(u.id)}
                    className={u.status === "active" ? "text-warning border-warning/20 hover:bg-warning/10" : ""}
                  >
                    {u.status === "active" ? "Suspend" : "Restore"}
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
*/

