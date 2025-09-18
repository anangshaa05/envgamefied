import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

interface StatsCounterProps {
  value: number;
  label: string;
  icon: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}

const StatsCounter = ({ 
  value, 
  label, 
  icon, 
  suffix = "", 
  prefix = "",
  duration = 2,
  decimals = 0 
}: StatsCounterProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return decimals > 0 
      ? latest.toFixed(decimals)
      : Math.round(latest).toLocaleString();
  });

  useEffect(() => {
    const controls = animate(count, value, { 
      duration,
      ease: "easeOut"
    });
    return controls.stop;
  }, [count, value, duration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-card rounded-xl p-6 shadow-card border border-border/50 hover:shadow-hover transition-all duration-300"
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center text-2xl shadow-soft">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-baseline space-x-1">
            <span className="text-sm text-muted-foreground">{prefix}</span>
            <motion.span className="text-2xl font-bold text-foreground">
              {rounded}
            </motion.span>
            <span className="text-sm text-muted-foreground">{suffix}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{label}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCounter;