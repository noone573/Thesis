import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/unifast/continuing")({ component: C });

const rows = Array.from({length: 12}, (_, i) => ({
  id: `TES-CON-${2024}-${String(i+1).padStart(3,"0")}`,
  name: ["A. Cruz","B. Reyes","C. Lim","D. Tan","E. Ong","F. Sy","G. Co","H. Po","I. Lee","J. Lopez","K. Aquino","L. Yap"][i],
  course: ["BSCS","BSED","BSIT","BSN","BSA"][i%5],
  year: (i%4)+1,
  amount: 12000 + (i%3)*2000,
}));

function C() {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Continuing TES Grantees — A.Y. 2025-2026</h3>
      <Table>
        <TableHeader><TableRow>
          <TableHead>ID</TableHead><TableHead>Name</TableHead><TableHead>Course</TableHead>
          <TableHead>Year</TableHead><TableHead>Subsidy</TableHead>
        </TableRow></TableHeader>
        <TableBody>{rows.map(r => (
          <TableRow key={r.id}>
            <TableCell className="font-mono text-xs">{r.id}</TableCell>
            <TableCell className="font-medium">{r.name}</TableCell>
            <TableCell>{r.course}</TableCell>
            <TableCell>{r.year}</TableCell>
            <TableCell>₱{r.amount.toLocaleString()}</TableCell>
          </TableRow>
        ))}</TableBody>
      </Table>
    </Card>
  );
}
