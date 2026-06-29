import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

export const Route = createFileRoute("/vpsea/reports")({ component: Rep });

const reports = [
  { name: "Scholarship Master List A.Y. 2024-2025", desc: "Consolidated list of all active scholars across programs.", size: "2.4 MB" },
  { name: "Academic Scholarship Approval Report Q2", desc: "Approval, rejection and renewal statistics.", size: "812 KB" },
  { name: "GWA Distribution Report", desc: "Cohort-wise grade weighted average breakdown.", size: "640 KB" },
  { name: "TDP Recipients Report", desc: "List of TDP recipients with subsidy amounts.", size: "1.1 MB" },
];

function Rep() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {reports.map(r => (
        <Card key={r.name} className="p-5 flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary"><FileText className="h-5 w-5" /></div>
          <div className="flex-1">
            <p className="font-medium">{r.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{r.desc}</p>
            <p className="text-xs text-muted-foreground mt-2">PDF · {r.size}</p>
          </div>
          <Button size="sm" variant="outline"><Download className="h-4 w-4" /></Button>
        </Card>
      ))}
    </div>
  );
}
