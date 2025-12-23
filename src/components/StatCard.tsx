import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  index?: number;
}

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  index = 0,
}: StatCardProps) {
  const changeColors = {
    positive: "text-green-400",
    negative: "text-red-400",
    neutral: "text-muted-foreground",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Card variant="glass" className="p-6 group hover:border-primary/30 transition-colors">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <h3 className="text-3xl font-bold font-serif text-gradient-gold">
              {value}
            </h3>
            {change && (
              <p className={`text-sm mt-2 ${changeColors[changeType]}`}>
                {change}
              </p>
            )}
          </div>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors"
          >
            <Icon className="w-6 h-6" />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
