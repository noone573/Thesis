import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/AdminLayout";
import { Search, Download, Eye } from "lucide-react";
import { api } from "@/lib/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const Route = createFileRoute("/student/applications")({ component: Apps });

function Apps() {
  const { data: applications = [] } = useQuery({ queryKey: ["student-applications"], queryFn: api.getApplications });

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search applications…" className="pl-9" />
        </div>
        <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead><TableHead>Scholarship</TableHead><TableHead>Submitted</TableHead>
            <TableHead>Status</TableHead><TableHead>Remarks</TableHead><TableHead>Updated</TableHead><TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((a: any) => (
            <TableRow key={a.id}>
              <TableCell className="font-mono text-xs">APP-{String(a.id).padStart(7, "0")}</TableCell>
              <TableCell className="font-medium">{a.scholarship_name}</TableCell>
              <TableCell>{a.submitted_at}</TableCell>
              <TableCell><StatusBadge status={a.status} /></TableCell>
              <TableCell className="text-muted-foreground text-sm">{a.remarks}</TableCell>
              <TableCell>{a.updated_at}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild><Button size="sm" variant="ghost"><Eye className="h-4 w-4" /></Button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>{a.scholarship_name} — APP-{String(a.id).padStart(7, "0")}</DialogTitle></DialogHeader>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-muted-foreground">Submitted:</span> {a.submitted_at}</p>
                      <p><span className="text-muted-foreground">Status:</span> <StatusBadge status={a.status} /></p>
                      <p><span className="text-muted-foreground">Last update:</span> {a.updated_at}</p>
                      <p><span className="text-muted-foreground">Admin remarks:</span> {a.remarks}</p>
                    </div>
                    <Button variant="outline" className="w-full"><Download className="h-4 w-4 mr-2" /> Download receipt</Button>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
