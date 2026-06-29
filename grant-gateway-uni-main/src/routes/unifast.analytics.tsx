import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/api";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/unifast/analytics")({ component: A });

function A() {
  const { data: analytics } = useQuery({ queryKey: ["unifast-analytics"], queryFn: api.getUniFASTAnalytics });

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="p-6 lg:col-span-2">
        <h3 className="font-semibold mb-4">Disbursement Trend</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={analytics?.tes_disbursement ?? []}>
            <defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4}/><stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="semester" fontSize={11} stroke="var(--muted-foreground)" />
            <YAxis fontSize={11} tickFormatter={v => `₱${v/1000000}M`} stroke="var(--muted-foreground)" />
            <Tooltip formatter={(v: number) => `₱${v.toLocaleString()}`} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
            <Area type="monotone" dataKey="amount" stroke="var(--chart-1)" fill="url(#ga)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
