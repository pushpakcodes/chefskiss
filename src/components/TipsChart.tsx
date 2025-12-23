import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TipsChartProps {
  data: Array<{
    name: string;
    tips: number;
    amount: number;
  }>;
  title?: string;
}

export function TipsChart({ data, title = "Tipping Trends" }: TipsChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="tipGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="amountGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(25, 85%, 55%)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(25, 85%, 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(20, 15%, 20%)" />
                <XAxis
                  dataKey="name"
                  stroke="hsl(40, 10%, 60%)"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="hsl(40, 10%, 60%)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(20, 12%, 10%)",
                    border: "1px solid hsl(20, 15%, 20%)",
                    borderRadius: "12px",
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
                  }}
                  labelStyle={{ color: "hsl(40, 30%, 95%)" }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="hsl(38, 92%, 50%)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#tipGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="tips"
                  stroke="hsl(25, 85%, 55%)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#amountGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
