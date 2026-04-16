import { motion } from "motion/react";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({ children, className = "", onClick, hoverable = false }: CardProps) {
  const Component = onClick || hoverable ? motion.div : "div";

  const props = onClick || hoverable ? {
    whileHover: { scale: 1.02 },
    whileTap: onClick ? { scale: 0.98 } : undefined,
  } : {};

  return (
    <Component
      className={`bg-card border border-border rounded-xl p-4 shadow-sm ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
}
