# Midwater Carwash

A mobile-first web application for **Midwater Carwash**, located in Aerorand, Middelburg, Mpumalanga, South Africa. Customers can browse wash services, book appointments, track live wash progress, manage vehicles, and earn loyalty rewards — all from their phone.

## Features

- **Service Menu** — Three wash tiers priced in ZAR: Express Wash (R 120), Premium Wash (R 220), and Deluxe Detail (R 380).
- **Online Booking** — Step-by-step flow to pick a service, date, time, and vehicle, then confirm the appointment.
- **Live Wash Tracker** — Real-time progress screen showing bay, washing, drying, and completion stages with an ETA countdown.
- **Vehicle Management** — Add and manage multiple vehicles linked to your account.
- **Loyalty Program** — Earn points per wash and redeem rewards such as complimentary washes.
- **Notifications Inbox** — Booking confirmations, wash-stage updates, reward alerts, and appointment reminders.
- **User Profiles** — Settings, saved payment methods, and support access.
- **Admin Dashboard** — Manage appointments, services, users, and view analytics.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build and dev server
- **Tailwind CSS 4** for styling
- **Radix UI** + **shadcn/ui** component primitives
- **React Router 7** for client-side routing
- **Motion** (Framer Motion) for animations
- **Recharts** for admin analytics charts
- **Lucide React** for icons
- **Deployed on [Netlify](https://www.netlify.com)**

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (bundled with Node.js)

### Install Dependencies

```bash
npm install
```

### Run the Dev Server

```bash
npm run dev
```

The app opens automatically in your browser at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

Output is written to the `dist/` directory and is ready for static hosting.

## Project Structure

```
src/
├── app/
│   ├── components/    # Reusable UI components (AppBar, BottomNav, Card, Button, etc.)
│   │   └── ui/        # shadcn/ui primitives
│   ├── data/          # Site config, service pricing, wash session seed data
│   ├── pages/         # Screen-level components
│   │   ├── admin/     # Admin dashboard screens
│   │   ├── booking/   # Multi-step booking flow
│   │   └── profile/   # Settings, payment methods, support
│   └── routes.tsx     # Route definitions
├── styles/            # Tailwind config, theme, fonts
└── main.tsx           # App entry point
```

## License

This project is proprietary to Midwater Carwash. All rights reserved.
