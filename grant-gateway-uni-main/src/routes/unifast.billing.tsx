import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/AdminLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/unifast/billing")({ component: B });

const bills = [
  { id: "BL-2025-001", sem: "1st 2025", amount: 1240000, submitted: "Apr 12", status: "Approved" },
  { id: "BL-2025-002", sem: "1st 2025", amount: 840000, submitted: "Apr 18", status: "Pending Validation" },
  { id: "BL-2025-003", sem: "1st 2025", amount: 660000, submitted: "Apr 22", status: "Approved" },
  { id: "BL-2025-004", sem: "1st 2025", amount: 320000, submitted: "Apr 28", status: "Needs Revision" },
  { id: "BL-2025-005", sem: "2nd 2024", amount: 980000, submitted: "Mar 15", status: "Approved" },
];

const chart = [
  { sem: "1st 24", amt: 2.4 },{ sem: "2nd 24", amt: 2.8 },{ sem: "1st 25", amt: 3.1 },
];

function B() {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        {[["Submitted","18","this sem"],["Approved","14","78% rate"],["Pending","4","under review"]].map(s => (
          <Card key={s[0]} className="p-5"><p className="text-xs uppercase text-muted-foreground tracking-wider">{s[0]}</p>
          <p className="text-3xl font-bold mt-2">{s[1]}</p><p className="text-xs text-muted-foreground mt-1">{s[2]}</p></Card>
        ))}
      </div>
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Billing Totals (₱M)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chart}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="sem" fontSize={11} stroke="var(--muted-foreground)" />
            <YAxis fontSize={11} stroke="var(--muted-foreground)" />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
            <Bar dataKey="amt" fill="var(--chart-4)" radius={[8,8,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Billing Records</h3>
        <Table>
          <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Semester</TableHead><TableHead>Amount</TableHead><TableHead>Submitted</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
          <TableBody>{bills.map(b => (
            <TableRow key={b.id}><TableCell className="font-mono text-xs">{b.id}</TableCell><TableCell>{b.sem}</TableCell>
            <TableCell className="font-medium">₱{b.amount.toLocaleString()}</TableCell><TableCell>{b.submitted}</TableCell>
            <TableCell><StatusBadge status={b.status} /></TableCell></TableRow>
          ))}</TableBody>
        </Table>
      </Card>
    </div>
  );
}
