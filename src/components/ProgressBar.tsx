import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number; // 0-100
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "eco";
  label?: string;
}

const ProgressBar = ({ 
  progress, 
  showPercentage = true, 
  size = "md", 
  variant = "default",
  label 
}: ProgressBarProps) => {
  const sizeClasses = {
    sm: "h-2",
    md: "h-3", 
    lg: "h-4"
  };

  const variantClasses = {
    default: "bg-primary",
    success: "bg-success",
    warning: "bg-warning", 
    eco: "bg-gradient-level"
  };

  const backgroundClasses = {
    default: "bg-muted",
    success: "bg-success/20",
    warning: "bg-warning/20",
    eco: "bg-primary/20"
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">{label}</span>
          {showPercentage && (
            <span className="text-sm font-medium text-muted-foreground">
              {Math.round(progress)}%
            </span>
          )}
        </div>
      )}
      
      <div className={`w-full ${backgroundClasses[variant]} rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <motion.div
          className={`h-full ${variantClasses[variant]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
          transition={{ 
            duration: 1,
            ease: "easeOut",
            delay: 0.2
          }}
        />
      </div>
      
      {!label && showPercentage && (
        <div className="mt-1 text-right">
          <span className="text-sm font-medium text-muted-foreground">
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;