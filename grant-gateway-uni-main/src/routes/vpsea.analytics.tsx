import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from "recharts";

export const Route = createFileRoute("/vpsea/analytics")({ component: An });

function An() {
  const { data: analytics } = useQuery({ queryKey: ["vpsea-analytics"], queryFn: api.getVPSEAAnalytics });

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="p-6 lg:col-span-2">
        <h3 className="font-semibold mb-4">Application Trend</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={analytics?.approval_trend ?? []}>
            <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4}/><stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" fontSize={11} stroke="var(--muted-foreground)" />
            <YAxis fontSize={11} stroke="var(--muted-foreground)" />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
            <Legend />
            <Area type="monotone" dataKey="approved" stroke="var(--chart-1)" fill="url(#g1)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
      <Card className="p-6">
        <h3 className="font-semibold mb-4">By Course</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={analytics?.course_distribution ?? []}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="course" fontSize={11} stroke="var(--muted-foreground)" />
            <YAxis fontSize={11} stroke="var(--muted-foreground)" />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
            <Bar dataKey="scholars" fill="var(--chart-2)" radius={[8,8,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card className="p-6">
        <h3 className="font-semibold mb-4">By Program</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={analytics?.scholarship_distribution ?? []}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="name" fontSize={11} stroke="var(--muted-foreground)" />
            <YAxis fontSize={11} stroke="var(--muted-foreground)" />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
            <Bar dataKey="value" fill="var(--chart-3)" radius={[8,8,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
