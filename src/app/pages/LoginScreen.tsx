import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Mail, Lock, Chrome } from "lucide-react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useAuth } from "../auth/AuthContext";

export function LoginScreen() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = login(formData.email, formData.password);
    setTimeout(() => {
      setLoading(false);
      if (!result.ok) return;
      navigate(result.role === "admin" ? "/admin" : "/home");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col px-6 py-12">
        <motion.div
          initial={{ opacity: 1, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-2xl mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to continue</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-4 flex-1"
        >
          <Input
            type="email"
            label="Email"
            placeholder="your@email.com"
            icon={<Mail className="w-4 h-4" />}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            icon={<Lock className="w-4 h-4" />}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-primary hover:underline"
          >
            Forgot Password?
          </button>

          <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
            Sign In
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button type="button" variant="outline" size="lg" className="w-full">
            <Chrome className="w-5 h-5" />
            Continue with Google
          </Button>
        </motion.form>

        <details className="mt-8 rounded-lg border border-border bg-muted/30 px-4 py-3 text-left">
          <summary className="text-sm font-medium text-muted-foreground cursor-pointer">
            Prototype login details
          </summary>
          <div className="mt-3 space-y-2 text-xs text-muted-foreground font-mono leading-relaxed">
            <p>
              <span className="font-sans font-medium text-foreground">Admin</span>
              <br />
              admin@midwater.co.za / MidwaterAdmin2026!
              <br />
              operations@midwater.co.za / MidwaterOps2026!
            </p>
            <p>
              <span className="font-sans font-medium text-foreground">Customer (seeded)</span>
              <br />
              customer@midwater.co.za / Customer2026!
            </p>
            <p className="font-sans text-[11px] pt-1 border-t border-border">
              Any other email + password signs in as a customer; your name is built from the email (e.g.
              jane.doe@mail.com).
            </p>
          </div>
        </details>

        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6"
        >
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-primary hover:underline"
            >
              Sign Up
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
