import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export const Route = createFileRoute("/unifast/distribution")({ component: D });

const data = [
  { batch: "B1", released: 1240, liquidated: 1180 },
  { batch: "B2", released: 980, liquidated: 920 },
  { batch: "B3", released: 1340, liquidated: 1050 },
  { batch: "B4", released: 760, liquidated: 480 },
];

const schedule = [
  { batch: "Batch 1 — Apr 15", count: 412, status: "Released", pct: 100 },
  { batch: "Batch 2 — May 03", count: 286, status: "Claiming", pct: 78 },
  { batch: "Batch 3 — May 20", count: 318, status: "Scheduled", pct: 0 },
];

function D() {
  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-4">
        {[["Released Funds","₱3.45M","1st sem 2025"],["Liquidated","₱2.86M","83% of released"],["Pending","₱590K","17% remaining"]].map(s=>(
          <Card key={s[0]} className="p-5"><p className="text-xs uppercase text-muted-foreground tracking-wider">{s[0]}</p>
          <p className="text-3xl font-bold mt-2">{s[1]}</p><p className="text-xs text-muted-foreground mt-1">{s[2]}</p></Card>
        ))}
      </div>
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Distribution Schedule</h3>
        <div className="space-y-4">
          {schedule.map(s => (
            <div key={s.batch} className="space-y-2">
              <div className="flex justify-between text-sm"><span className="font-medium">{s.batch}</span><span className="text-muted-foreground">{s.count} grantees · {s.status}</span></div>
              <Progress value={s.pct} />
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Released vs Liquidated (₱K)</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="batch" fontSize={11} stroke="var(--muted-foreground)" />
            <YAxis fontSize={11} stroke="var(--muted-foreground)" />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
            <Legend />
            <Bar dataKey="released" fill="var(--chart-1)" radius={[8,8,0,0]} />
            <Bar dataKey="liquidated" fill="var(--chart-3)" radius={[8,8,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
