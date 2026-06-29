import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Users, Receipt, FileBarChart, Send } from "lucide-react";
import { api } from "@/lib/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";

export const Route = createFileRoute("/unifast/")({ component: D });

function S({ icon: I, label, value, hint, tone }: any) {
  return (
    <Card className="p-5"><div className="flex items-start justify-between">
      <div><p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-3xl font-bold mt-2">{value}</p><p className="text-xs text-muted-foreground mt-1">{hint}</p></div>
      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${tone}`}><I className="h-5 w-5" /></div></div></Card>
  );
}

const billing = [
  { sem: "1st 23", submitted: 124, approved: 110 },
  { sem: "2nd 23", submitted: 142, approved: 132 },
  { sem: "1st 24", submitted: 168, approved: 158 },
  { sem: "2nd 24", submitted: 184, approved: 170 },
  { sem: "1st 25", submitted: 202, approved: 192 },
];

function D() {
  const { data: dashboard } = useQuery({ queryKey: ["unifast-dashboard"], queryFn: api.getUniFASTDashboard });
  const { data: analytics } = useQuery({ queryKey: ["unifast-analytics"], queryFn: api.getUniFASTAnalytics });

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <S icon={Users} label="TES Beneficiaries" value={dashboard?.tes_beneficiaries ?? "—"} hint="Active grantees" tone="bg-primary-soft text-primary" />
        <S icon={Users} label="TDP Scholars" value={dashboard?.tdp_scholars ?? "—"} hint="Currently enrolled" tone="bg-info/15 text-info" />
        <S icon={Receipt} label="Billing Status" value={`${dashboard?.billing_approved_pct ?? "—"}%`} hint="Approved this sem" tone="bg-success/15 text-success" />
        <S icon={FileBarChart} label="Pending Liquidation" value={dashboard?.pending_liquidation ?? "—"} hint="Batches pending" tone="bg-warning/15 text-warning-foreground" />
        <S icon={Send} label="Released Funds" value="₱3.45M" hint="1st Sem A.Y. 2025" tone="bg-primary-soft text-primary" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">TDP Disbursement by Semester</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={analytics?.tes_disbursement ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="semester" fontSize={11} stroke="var(--muted-foreground)" />
              <YAxis fontSize={11} stroke="var(--muted-foreground)" tickFormatter={v => `₱${v/1000000}M`} />
              <Tooltip formatter={(v: number) => `₱${v.toLocaleString()}`} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Bar dataKey="amount" fill="var(--chart-1)" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Billing Progress</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={billing}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="sem" fontSize={11} stroke="var(--muted-foreground)" />
              <YAxis fontSize={11} stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Legend />
              <Line type="monotone" dataKey="submitted" stroke="var(--chart-2)" strokeWidth={2} />
              <Line type="monotone" dataKey="approved" stroke="var(--chart-3)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
