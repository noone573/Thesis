import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/AdminLayout";

export const Route = createFileRoute("/unifast/liquidation")({ component: L });

const rows = [
  { id: "LQ-2025-001", batch: "Batch 1", amount: 420000, date: "Apr 25", status: "Approved" },
  { id: "LQ-2025-002", batch: "Batch 1", amount: 380000, date: "Apr 28", status: "Approved" },
  { id: "LQ-2025-003", batch: "Batch 2", amount: 290000, date: "May 6", status: "Pending Validation" },
  { id: "LQ-2025-004", batch: "Batch 2", amount: 240000, date: "May 9", status: "Needs Revision" },
  { id: "LQ-2025-005", batch: "Batch 2", amount: 195000, date: "May 12", status: "Pending Validation" },
];

function L() {
  return (
    <Card className="p-6">
      <Table>
        <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Batch</TableHead><TableHead>Amount</TableHead><TableHead>Submitted</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
        <TableBody>{rows.map(r => (
          <TableRow key={r.id}><TableCell className="font-mono text-xs">{r.id}</TableCell><TableCell>{r.batch}</TableCell>
          <TableCell className="font-medium">₱{r.amount.toLocaleString()}</TableCell><TableCell>{r.date}</TableCell>
          <TableCell><StatusBadge status={r.status} /></TableCell></TableRow>
        ))}</TableBody>
      </Table>
    </Card>
  );
}
