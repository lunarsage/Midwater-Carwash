import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { UserRole } from "./credentials";
import {
  displayNameFromEmail,
  findSeededAccount,
  firstName as firstNameFromFullName,
  initialsFromName,
} from "./credentials";

const STORAGE_KEY = "midwater_auth_session_v1";

export interface AuthUser {
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (
    email: string,
    password: string
  ) => { ok: boolean; role?: UserRole };
  register: (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => void;
  logout: () => void;
  /** First word of the signed-in user's name (for “Hello, …”) */
  greetingName: string;
  initials: string;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadSession(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthUser;
    if (!parsed?.email || !parsed?.name || !parsed?.role) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveSession(user: AuthUser | null) {
  if (!user) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() =>
    typeof window !== "undefined" ? loadSession() : null
  );

  const login = useCallback((email: string, password: string) => {
    const trimmed = email.trim();
    if (!trimmed || !password) return { ok: false };

    const seeded = findSeededAccount(trimmed, password);
    if (seeded) {
      const next: AuthUser = {
        email: seeded.email,
        name: seeded.name,
        role: seeded.role,
      };
      setUser(next);
      saveSession(next);
      return { ok: true, role: seeded.role };
    }

    const next: AuthUser = {
      email: trimmed,
      name: displayNameFromEmail(trimmed),
      role: "customer",
    };
    setUser(next);
    saveSession(next);
    return { ok: true, role: "customer" };
  }, []);

  const register = useCallback(
    (data: { name: string; email: string; phone: string; password: string }) => {
      const next: AuthUser = {
        email: data.email.trim(),
        name: data.name.trim(),
        phone: data.phone.trim(),
        role: "customer",
      };
      setUser(next);
      saveSession(next);
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    saveSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login,
      register,
      logout,
      greetingName: user ? firstNameFromFullName(user.name) : "there",
      initials: user ? initialsFromName(user.name) : "?",
    }),
    [user, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
