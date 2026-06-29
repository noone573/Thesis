import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Upload, FileSpreadsheet, CheckCircle2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/vpsea/uploads")({ component: U });

const recent = [
  { file: "dost_scholars_2024.xlsx", rows: 124, date: "May 12, 2025", status: "Imported" },
  { file: "ched_merit_2024.csv", rows: 86, date: "May 8, 2025", status: "Imported" },
  { file: "cosch_q1_2025.xlsx", rows: 42, date: "Apr 30, 2025", status: "Imported" },
  { file: "sports_2025.xlsx", rows: 31, date: "Apr 22, 2025", status: "Imported" },
];

function U() {
  return (
    <div className="space-y-6">
      <Card className="p-8">
        <div className="border-2 border-dashed rounded-2xl p-12 text-center bg-muted/30">
          <Upload className="h-12 w-12 mx-auto text-primary mb-3" />
          <p className="font-semibold">Drag & drop your spreadsheet</p>
          <p className="text-sm text-muted-foreground mt-1">.xlsx, .csv — up to 10MB</p>
          <Button className="mt-4">Choose File</Button>
        </div>
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm mb-2"><span>dost_scholars_2025_q2.xlsx</span><span className="text-success">82%</span></div>
          <Progress value={82} />
        </div>
      </Card>
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Recent Imports</h3>
        <Table>
          <TableHeader><TableRow><TableHead>File</TableHead><TableHead>Rows</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
          <TableBody>{recent.map(r => (
            <TableRow key={r.file}>
              <TableCell className="font-medium"><FileSpreadsheet className="h-4 w-4 inline mr-2 text-muted-foreground" />{r.file}</TableCell>
              <TableCell>{r.rows}</TableCell><TableCell>{r.date}</TableCell>
              <TableCell><span className="inline-flex items-center gap-1 text-success text-sm"><CheckCircle2 className="h-3 w-3" /> {r.status}</span></TableCell>
            </TableRow>
          ))}</TableBody>
        </Table>
      </Card>
    </div>
  );
}
