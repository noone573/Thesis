import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/AdminLayout";

export const Route = createFileRoute("/unifast/tdp")({ component: T });

const rows = Array.from({length: 10}, (_, i) => ({
  id: `TDP-2025-${String(100+i).padStart(4,"0")}`,
  name: ["Ana Lim","Ben Cruz","Carla Tan","Dino Ong","Eva Reyes","Faye Lopez","Gio Co","Hana Sy","Ivan Po","Jen Lee"][i],
  course: ["BSED","BSCS","BSIT","BSN","BSA","BSBA","BSED","BSCS","BSIT","BSN"][i],
  amount: 20000 + i*500,
  status: ["Pending Validation","Approved","Needs Revision","Approved","Pending Validation","Rejected","Approved","Pending Validation","Approved","Needs Revision"][i],
}));

function T() {
  return (
    <Card className="p-6">
      <Table>
        <TableHeader><TableRow>
          <TableHead>TDP ID</TableHead><TableHead>Name</TableHead><TableHead>Course</TableHead>
          <TableHead>Subsidy</TableHead><TableHead>Status</TableHead><TableHead></TableHead>
        </TableRow></TableHeader>
        <TableBody>{rows.map(r => (
          <TableRow key={r.id}>
            <TableCell className="font-mono text-xs">{r.id}</TableCell>
            <TableCell className="font-medium">{r.name}</TableCell>
            <TableCell>{r.course}</TableCell>
            <TableCell>₱{r.amount.toLocaleString()}</TableCell>
            <TableCell><StatusBadge status={r.status} /></TableCell>
            <TableCell className="space-x-2"><Button size="sm" variant="outline">Review</Button><Button size="sm">Approve</Button></TableCell>
          </TableRow>
        ))}</TableBody>
      </Table>
    </Card>
  );
}
