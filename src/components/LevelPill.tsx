import { motion } from "framer-motion";

interface LevelPillProps {
  level: number;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  animated?: boolean;
}

const LevelPill = ({ 
  level, 
  size = "md", 
  showText = true,
  animated = true 
}: LevelPillProps) => {
  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-12 h-12 text-lg"
  };

  const Component = animated ? motion.div : "div";
  const props = animated ? {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  } : {};

  return (
    <div className="flex items-center space-x-2">
      <Component
        {...props}
        className={`
          ${sizeClasses[size]} 
          bg-gradient-level rounded-full 
          flex items-center justify-center 
          font-bold text-white 
          shadow-soft
        `}
      >
        {level}
      </Component>
      {showText && (
        <span className="text-sm font-medium text-muted-foreground">
          Level {level}
        </span>
      )}
    </div>
  );
};

export default LevelPill;