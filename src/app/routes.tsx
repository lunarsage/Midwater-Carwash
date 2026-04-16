import { createBrowserRouter } from "react-router";

import { SplashScreen } from "./pages/SplashScreen";
import { WelcomeScreen } from "./pages/WelcomeScreen";
import { LoginScreen } from "./pages/LoginScreen";
import { RegisterScreen } from "./pages/RegisterScreen";
import { ForgotPasswordScreen } from "./pages/ForgotPasswordScreen";

import { HomeScreen } from "./pages/HomeScreen";
import { ServicesScreen } from "./pages/ServicesScreen";
import { AppointmentsScreen } from "./pages/AppointmentsScreen";
import { LoyaltyScreen } from "./pages/LoyaltyScreen";
import { ProfileScreen } from "./pages/ProfileScreen";
import { NotificationsScreen } from "./pages/NotificationsScreen";

import { DateSelection } from "./pages/booking/DateSelection";
import { TimeSelection } from "./pages/booking/TimeSelection";
import { VehicleSelection } from "./pages/booking/VehicleSelection";
import { BookingConfirmation } from "./pages/booking/BookingConfirmation";
import { BookingSuccess } from "./pages/booking/BookingSuccess";

import { VehiclesScreen } from "./pages/VehiclesScreen";
import { AddVehicleScreen } from "./pages/AddVehicleScreen";

import { AdminHome } from "./pages/admin/AdminHome";
import { AdminAppointments } from "./pages/admin/AdminAppointments";
import { AdminAnalytics } from "./pages/admin/AdminAnalytics";
import { WashProgressScreen } from "./pages/WashProgressScreen";
import { SettingsScreen } from "./pages/profile/SettingsScreen";
import { PaymentMethodsScreen } from "./pages/profile/PaymentMethodsScreen";
import { SupportScreen } from "./pages/profile/SupportScreen";
import { AdminServices } from "./pages/admin/AdminServices";
import { AdminUsers } from "./pages/admin/AdminUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SplashScreen,
  },
  {
    path: "/welcome",
    Component: WelcomeScreen,
  },
  {
    path: "/login",
    Component: LoginScreen,
  },
  {
    path: "/register",
    Component: RegisterScreen,
  },
  {
    path: "/forgot-password",
    Component: ForgotPasswordScreen,
  },
  {
    path: "/home",
    Component: HomeScreen,
  },
  {
    path: "/services",
    Component: ServicesScreen,
  },
  {
    path: "/appointments",
    Component: AppointmentsScreen,
  },
  {
    path: "/loyalty",
    Component: LoyaltyScreen,
  },
  {
    path: "/profile",
    Component: ProfileScreen,
  },
  {
    path: "/profile/settings",
    Component: SettingsScreen,
  },
  {
    path: "/profile/payment",
    Component: PaymentMethodsScreen,
  },
  {
    path: "/profile/support",
    Component: SupportScreen,
  },
  {
    path: "/notifications",
    Component: NotificationsScreen,
  },
  {
    path: "/wash-progress",
    Component: WashProgressScreen,
  },
  {
    path: "/booking/date",
    Component: DateSelection,
  },
  {
    path: "/booking/time",
    Component: TimeSelection,
  },
  {
    path: "/booking/vehicle",
    Component: VehicleSelection,
  },
  {
    path: "/booking/confirm",
    Component: BookingConfirmation,
  },
  {
    path: "/booking/success",
    Component: BookingSuccess,
  },
  {
    path: "/vehicles",
    Component: VehiclesScreen,
  },
  {
    path: "/vehicles/add",
    Component: AddVehicleScreen,
  },
  {
    path: "/admin",
    Component: AdminHome,
  },
  {
    path: "/admin/appointments",
    Component: AdminAppointments,
  },
  {
    path: "/admin/services",
    Component: AdminServices,
  },
  {
    path: "/admin/users",
    Component: AdminUsers,
  },
  {
    path: "/admin/analytics",
    Component: AdminAnalytics,
  },
]);
