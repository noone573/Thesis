import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Users, CheckCircle2, XCircle, Clock, RefreshCw } from "lucide-react";
import { api } from "@/lib/api";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, LineChart, Line, Legend, PieChart, Pie, Cell } from "recharts";

export const Route = createFileRoute("/vpsea/")({ component: D });

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

function Stat({ icon: I, label, value, sub, tone }: any) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{sub}</p>
        </div>
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${tone}`}><I className="h-5 w-5" /></div>
      </div>
    </Card>
  );
}

function D() {
  const { data: dashboard } = useQuery({ queryKey: ["vpsea-dashboard"], queryFn: api.getVPSEADashboard });
  const { data: analytics } = useQuery({ queryKey: ["vpsea-analytics"], queryFn: api.getVPSEAAnalytics });

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Stat icon={Users} label="Total Applicants" value={dashboard?.total_applicants ?? "—"} sub="This A.Y." tone="bg-primary-soft text-primary" />
        <Stat icon={CheckCircle2} label="Approved" value={dashboard?.approved ?? "—"} sub="Approval rate" tone="bg-success/15 text-success" />
        <Stat icon={XCircle} label="Rejected" value={dashboard?.rejected ?? "—"} sub="Rejection rate" tone="bg-destructive/15 text-destructive" />
        <Stat icon={Clock} label="Pending" value={dashboard?.pending ?? "—"} sub="Awaiting validation" tone="bg-warning/15 text-warning-foreground" />
        <Stat icon={RefreshCw} label="Renewals" value={dashboard?.renewals ?? "—"} sub="Awaiting review" tone="bg-info/15 text-info" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Scholars by Course</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={analytics?.course_distribution ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="course" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Bar dataKey="scholars" fill="var(--chart-1)" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">GWA Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={analytics?.gpa_distribution ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="range" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Bar dataKey="count" fill="var(--chart-3)" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h3 className="font-semibold mb-4">Approval vs Rejection</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={analytics?.approval_trend ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Legend />
              <Line type="monotone" dataKey="approved" stroke="var(--chart-3)" strokeWidth={2} />
              <Line type="monotone" dataKey="rejected" stroke="var(--destructive)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Scholarship Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={analytics?.scholarship_distribution ?? []} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={2}>
                {(analytics?.scholarship_distribution ?? []).map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
