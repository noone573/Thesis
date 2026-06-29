import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/unifast/tes")({ component: T });

const steps = [
  { title: "Continuing TES Grantees", desc: "1,284 grantees rolled over from previous A.Y.", status: "done" },
  { title: "TES Regular Applicants", desc: "412 new applicants screened", status: "done" },
  { title: "Validation Process", desc: "Document & eligibility verification", status: "active" },
  { title: "Billing Preparation", desc: "Generating billing templates", status: "upcoming" },
  { title: "Distribution", desc: "Fund release to grantees", status: "upcoming" },
  { title: "Liquidation", desc: "Final liquidation submitted to UniFAST", status: "upcoming" },
];

function T() {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-1">TES Workflow — A.Y. 2025-2026</h3>
      <p className="text-sm text-muted-foreground mb-6">Step-by-step processing pipeline for Tertiary Education Subsidy.</p>
      <div className="space-y-4">
        {steps.map((s, i) => (
          <div key={s.title} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium ${
                s.status === "done" ? "bg-success text-success-foreground" :
                s.status === "active" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {s.status === "done" ? <CheckCircle2 className="h-5 w-5" /> : i+1}
              </div>
              {i < steps.length - 1 && <div className="w-px flex-1 bg-border my-2" />}
            </div>
            <div className="pb-6">
              <div className="flex items-center gap-2">
                <p className="font-medium">{s.title}</p>
                {s.status === "active" && <Badge className="bg-primary-soft text-primary border-0">In progress</Badge>}
                {s.status === "done" && <Badge variant="outline" className="bg-success/10 text-success border-success/20">Complete</Badge>}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
