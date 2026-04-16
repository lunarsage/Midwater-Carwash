import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

/** Redirects to login if there is no session. */
export function useRequireCustomer() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  return user;
}

/** Redirects to login if not signed in; to home if not an admin. */
export function useRequireAdmin() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    if (user.role !== "admin") {
      navigate("/home", { replace: true });
    }
  }, [user, navigate]);

  return user?.role === "admin" ? user : null;
}
