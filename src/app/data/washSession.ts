import type { LucideIcon } from "lucide-react";
import {
  CheckCircle,
  Gift,
  Calendar,
  XCircle,
  Sparkles,
  Droplets,
} from "lucide-react";
import { SITE } from "./site";

export type WashStageId = "bay" | "washing" | "drying" | "complete";

export interface WashStage {
  id: WashStageId;
  title: string;
  funLine: string;
}

/** Stages shown on the live wash progress screen */
export const WASH_STAGES: WashStage[] = [
  {
    id: "bay",
    title: "In the bay",
    funLine: "Parked and queued — your car is front and centre in our bay.",
  },
  {
    id: "washing",
    title: "Washing",
    funLine: "Scrub-a-dub time — soap, rinse, repeat. We’re making the grime disappear.",
  },
  {
    id: "drying",
    title: "Drying",
    funLine: "Blow-dry glam — towels and air blades until every drop is gone.",
  },
  {
    id: "complete",
    title: "Your car is clean",
    funLine: "Spotless and shining — keys are waiting. Go turn heads in Middelburg!",
  },
];

/**
 * Prototype “live” wash tied to the same booking as notifications.
 * currentStageIndex: 0 = bay … 3 = complete
 */
export const activeWashSession = {
  bookingRef: "MW-2026-042",
  vehicleLabel: "Toyota Corolla",
  plate: "MP 12 AB GP",
  serviceName: "Premium Wash",
  /** Matches notification copy — user is in “drying” in the demo */
  currentStageIndex: 2,
  /** Minutes from “now” until we estimate handover */
  etaMinutesRemaining: 18,
  locationLabel: SITE.shortLocation,
} as const;

export function getWashProgressFraction(): number {
  const idx = activeWashSession.currentStageIndex;
  return (idx + 1) / WASH_STAGES.length;
}

export function getEstimatedCompletionTime(): Date {
  return new Date(
    Date.now() + activeWashSession.etaMinutesRemaining * 60 * 1000
  );
}

export interface SeedNotification {
  id: number;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  /** Deep link for prototype (e.g. live wash tracker) */
  linkTo?: string;
}

/**
 * Seeded inbox — includes wash progress rows that match `activeWashSession`
 * and site location (Aerorand, Middelburg).
 */
export const seedNotifications: SeedNotification[] = [
  {
    id: 10,
    icon: Droplets,
    iconColor: "text-info",
    iconBg: "bg-info/10",
    title: "Wash update: Drying now",
    message: `Your Premium Wash is in the drying zone at ${SITE.businessName} (${SITE.shortLocation}). Tap to see live progress and ETA.`,
    time: "Just now",
    read: false,
    linkTo: "/wash-progress",
  },
  {
    id: 11,
    icon: Sparkles,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    title: "From the bay: washing started",
    message:
      "Soap party in progress — your Corolla is getting the full scrub. We’ll ping you when it moves to drying.",
    time: "12 min ago",
    read: true,
    linkTo: "/wash-progress",
  },
  {
    id: 1,
    icon: CheckCircle,
    iconColor: "text-success",
    iconBg: "bg-success/10",
    title: "Booking confirmed",
    message: `You’re booked at ${SITE.businessName}, ${SITE.shortLocation} — Premium Wash today at 14:00.`,
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    icon: Gift,
    iconColor: "text-warning",
    iconBg: "bg-warning/10",
    title: "Reward unlocked!",
    message: "You’ve earned a complimentary Express Wash. Tap Loyalty to redeem.",
    time: "1 day ago",
    read: false,
  },
  {
    id: 3,
    icon: Calendar,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    title: "Upcoming appointment",
    message: "Reminder: another Premium Wash tomorrow at 10:00 — same great sparkle at Aerorand.",
    time: "1 day ago",
    read: true,
  },
  {
    id: 4,
    icon: XCircle,
    iconColor: "text-destructive",
    iconBg: "bg-destructive/10",
    title: "Booking cancelled",
    message: "Your Express Wash slot was cancelled — rebook anytime from Services.",
    time: "3 days ago",
    read: true,
  },
];
