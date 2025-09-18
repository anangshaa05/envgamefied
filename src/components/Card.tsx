import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  onClick?: () => void;
  variant?: "default" | "lesson" | "challenge" | "community";
}

const Card = ({ 
  children, 
  className,
  hover = true,
  gradient = false,
  onClick,
  variant = "default"
}: CardProps) => {
  const baseClasses = "rounded-xl border shadow-card transition-all duration-300";
  
  const variantClasses = {
    default: "bg-card border-border/50",
    lesson: "bg-gradient-card border-primary/20",
    challenge: "bg-card border-warning/30",
    community: "bg-card border-secondary-accent/30"
  };

  const hoverClasses = hover 
    ? "hover:shadow-hover hover:-translate-y-1 cursor-pointer" 
    : "";

  const gradientClasses = gradient 
    ? "bg-gradient-card" 
    : "";

  const Component = onClick ? motion.div : "div";
  const motionProps = onClick ? {
    whileHover: { y: -4, scale: 1.02 },
    whileTap: { scale: 0.98 }
  } : {};

  return (
    <Component
      {...motionProps}
      onClick={onClick}
      className={cn(
        baseClasses,
        variantClasses[variant],
        hoverClasses,
        gradientClasses,
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Card;