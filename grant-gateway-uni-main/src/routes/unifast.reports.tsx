import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

export const Route = createFileRoute("/unifast/reports")({ component: R });

const list = [
  { name: "TES Disbursement Summary", desc: "Per-semester TES release breakdown.", size: "1.2 MB" },
  { name: "TDP Compliance Report", desc: "Compliance with UniFAST guidelines.", size: "920 KB" },
  { name: "FHE Utilization Report", desc: "Free Higher Education enrollment metrics.", size: "740 KB" },
];

function R() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {list.map(r => (
        <Card key={r.name} className="p-5 flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary"><FileText className="h-5 w-5" /></div>
          <div className="flex-1"><p className="font-medium">{r.name}</p><p className="text-xs text-muted-foreground mt-1">{r.desc}</p><p className="text-xs text-muted-foreground mt-2">PDF · {r.size}</p></div>
          <Button size="sm" variant="outline"><Download className="h-4 w-4" /></Button>
        </Card>
      ))}
    </div>
  );
}
