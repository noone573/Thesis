import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/vpsea/renewals")({ component: R });

const renewals = Array.from({length: 8}, (_, i) => ({
  id: `REN-2025-${String(20+i).padStart(3,"0")}`,
  name: ["Maria Santos","Pedro Reyes","Anna Cruz","Mark Lim","Jasmine Tan","Carlo Aquino","Liza Ong","Ben Co"][i],
  prev: +(1.1 + i*0.05).toFixed(2),
  current: +(1.05 + i*0.06).toFixed(2),
  status: ["Renewal Pending","Approved","Renewal Pending","Rejected"][i % 4],
}));

function R() {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        {[{l:"Awaiting Review",v:32,c:"text-warning-foreground"},{l:"Approved Renewals",v:184,c:"text-success"},{l:"Rejected",v:12,c:"text-destructive"}].map(s =>(
          <Card key={s.l} className="p-5"><p className="text-xs uppercase text-muted-foreground tracking-wider">{s.l}</p><p className={`text-3xl font-bold mt-2 ${s.c}`}>{s.v}</p></Card>
        ))}
      </div>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Continuing Scholars</h3>
          <Progress value={62} className="w-48 h-2" />
        </div>
        <Table>
          <TableHeader><TableRow>
            <TableHead>ID</TableHead><TableHead>Name</TableHead><TableHead>Previous GWA</TableHead>
            <TableHead>Current GWA</TableHead><TableHead>Report Card</TableHead><TableHead>Status</TableHead><TableHead></TableHead>
          </TableRow></TableHeader>
          <TableBody>{renewals.map(r => (
            <TableRow key={r.id}>
              <TableCell className="font-mono text-xs">{r.id}</TableCell>
              <TableCell className="font-medium">{r.name}</TableCell>
              <TableCell>{r.prev}</TableCell>
              <TableCell>{r.current}</TableCell>
              <TableCell><Button size="sm" variant="ghost">View PDF</Button></TableCell>
              <TableCell><StatusBadge status={r.status} /></TableCell>
              <TableCell><Button size="sm">Review</Button></TableCell>
            </TableRow>
          ))}</TableBody>
        </Table>
      </Card>
    </div>
  );
}
