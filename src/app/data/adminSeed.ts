import { SERVICE_PRICES } from "./site";

export const ADMIN_WEEKLY_REVENUE = [
  { day: "Mon", amount: 18640 },
  { day: "Tue", amount: 21320 },
  { day: "Wed", amount: 24780 },
  { day: "Thu", amount: 23160 },
  { day: "Fri", amount: 29640 },
  { day: "Sat", amount: 34200 },
  { day: "Sun", amount: 26880 },
] as const;

export const ADMIN_TOTAL_REVENUE = 178_620;

export const ADMIN_SERVICES_SEED = [
  { id: "svc_express", name: "Express Wash", durationMinutes: 15, price: SERVICE_PRICES.express, active: true },
  { id: "svc_premium", name: "Premium Wash", durationMinutes: 30, price: SERVICE_PRICES.premium, active: true },
  { id: "svc_deluxe", name: "Deluxe Detail", durationMinutes: 60, price: SERVICE_PRICES.deluxe, active: true },
] as const;

export const ADMIN_USERS_SEED = [
  { id: "u1", name: "Lerato Mokoena", email: "customer@midwater.co.za", role: "customer" as const, status: "active" as const },
  { id: "u2", name: "Nomsa Nkosi", email: "admin@midwater.co.za", role: "admin" as const, status: "active" as const },
  { id: "u3", name: "Pieter van der Merwe", email: "operations@midwater.co.za", role: "admin" as const, status: "active" as const },
  { id: "u4", name: "Thabo Nkosi", email: "thabo.nkosi@example.com", role: "customer" as const, status: "active" as const },
  { id: "u5", name: "Aisha Patel", email: "aisha.patel@example.com", role: "customer" as const, status: "suspended" as const },
  { id: "u6", name: "Sarah Johnson", email: "sarah.johnson@example.com", role: "staff" as const, status: "active" as const },
] as const;

