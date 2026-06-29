import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/AdminLayout";
import { Search, Filter, Check, X, RotateCcw, FileText, Eye } from "lucide-react";
import { api } from "@/lib/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export const Route = createFileRoute("/vpsea/applications")({ component: A });

function A() {
  const qc = useQueryClient();
  const { data: applications = [] } = useQuery({ queryKey: ["vpsea-applications"], queryFn: api.getVPSEAApplications });
  const [remarks, setRemarks] = useState<Record<number, string>>({});

  const mutate = useMutation({
    mutationFn: ({ id, status, remark }: { id: number; status: string; remark?: string }) =>
      api.updateVPSEAApplication(id, { status, remarks: remark ?? "" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["vpsea-applications"] }),
  });

  return (
    <Card className="p-6">
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search applicants by name or ID…" className="pl-9" />
        </div>
        <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
        <Button variant="outline">Export CSV</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead><TableHead>Student</TableHead><TableHead>Course</TableHead>
            <TableHead>Year</TableHead><TableHead>GWA</TableHead><TableHead>Type</TableHead>
            <TableHead>Status</TableHead><TableHead>Date</TableHead><TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((a: any) => (
            <TableRow key={a.id}>
              <TableCell className="font-mono text-xs">APP-{String(a.id).padStart(7, "0")}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7"><AvatarFallback className="text-[10px] bg-primary-soft text-primary">{a.student_name?.split(" ").map((n: string) => n[0]).slice(0,2).join("") ?? "?"}</AvatarFallback></Avatar>
                  <span className="text-sm font-medium">{a.student_name}</span>
                </div>
              </TableCell>
              <TableCell>{a.student_course}</TableCell>
              <TableCell>{a.student_year}</TableCell>
              <TableCell><Badge variant="outline">{a.student_gwa}</Badge></TableCell>
              <TableCell>{a.scholarship_name}</TableCell>
              <TableCell><StatusBadge status={a.status} /></TableCell>
              <TableCell className="text-sm text-muted-foreground">{a.submitted_at}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild><Button size="sm" variant="ghost"><Eye className="h-4 w-4" /></Button></DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader><DialogTitle>{a.student_name} — APP-{String(a.id).padStart(7, "0")}</DialogTitle></DialogHeader>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><p className="text-xs text-muted-foreground">Course</p><p className="font-medium">{a.student_course}</p></div>
                      <div><p className="text-xs text-muted-foreground">GWA</p><p className="font-medium">{a.student_gwa}</p></div>
                      <div><p className="text-xs text-muted-foreground">Type</p><p className="font-medium">{a.scholarship_name}</p></div>
                      <div><p className="text-xs text-muted-foreground">Status</p><StatusBadge status={a.status} /></div>
                    </div>
                    <div>
                      <p className="text-xs font-medium mb-2">Uploaded Documents</p>
                      <div className="space-y-1">
                        {(a.documents?.length ? a.documents : ["Certificate of Grades","Certificate of Enrollment","Good Moral","Study Load"]).map((d: any) => (
                          <div key={d.name ?? d} className="flex items-center justify-between p-2 rounded bg-muted/50 text-sm">
                            <span className="flex items-center gap-2"><FileText className="h-3 w-3" /> {d.name ?? d}</span>
                            <Button size="sm" variant="ghost">View</Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium mb-1">Admin Remarks</p>
                      <Textarea placeholder="Add notes for the applicant…" value={remarks[a.id] ?? ""} onChange={e => setRemarks(r => ({ ...r, [a.id]: e.target.value }))} />
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-success hover:bg-success/90" onClick={() => mutate.mutate({ id: a.id, status: "Approved", remark: remarks[a.id] })}><Check className="h-4 w-4 mr-2" /> Approve</Button>
                      <Button variant="outline" className="flex-1" onClick={() => mutate.mutate({ id: a.id, status: "Needs Revision", remark: remarks[a.id] })}><RotateCcw className="h-4 w-4 mr-2" /> Request Revision</Button>
                      <Button variant="destructive" className="flex-1" onClick={() => mutate.mutate({ id: a.id, status: "Rejected", remark: remarks[a.id] })}><X className="h-4 w-4 mr-2" /> Reject</Button>
                    </div>
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
