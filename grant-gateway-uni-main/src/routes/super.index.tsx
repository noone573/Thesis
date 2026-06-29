import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Users, Building2, Tags, Activity } from "lucide-react";
import { api } from "@/lib/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/AdminLayout";

export const Route = createFileRoute("/super/")({ component: D });

function S({ icon: I, label, value, tone }: any) {
  return <Card className="p-5"><div className="flex items-start justify-between">
    <div><p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p><p className="text-3xl font-bold mt-2">{value}</p></div>
    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${tone}`}><I className="h-5 w-5" /></div>
  </div></Card>;
}

function D() {
  const { data: dashboard } = useQuery({ queryKey: ["super-dashboard"], queryFn: api.getSuperDashboard });

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-4 gap-4">
        <S icon={Users} label="Total Users" value={dashboard?.total_users ?? "—"} tone="bg-primary-soft text-primary" />
        <S icon={Building2} label="Office Accounts" value={dashboard?.office_accounts ?? "—"} tone="bg-info/15 text-info" />
        <S icon={Tags} label="Scholarship Programs" value={dashboard?.scholarship_programs ?? "—"} tone="bg-success/15 text-success" />
        <S icon={Activity} label="Activity (24h)" value={dashboard?.activity_24h ?? "—"} tone="bg-warning/15 text-warning-foreground" />
      </div>
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Recent Admin Activity</h3>
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Role</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
          <TableBody>{(dashboard?.recent_users ?? []).map((u: any) => (
            <TableRow key={u.id}>
              <TableCell className="font-medium">{u.first_name} {u.last_name}</TableCell>
              <TableCell className="text-muted-foreground">{u.email}</TableCell>
              <TableCell>{u.role}</TableCell>
              <TableCell><StatusBadge status={u.status} /></TableCell>
            </TableRow>
          ))}</TableBody>
        </Table>
      </Card>
    </div>
  );
}
