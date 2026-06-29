import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Building2 } from "lucide-react";

export const Route = createFileRoute("/super/offices")({ component: O });

const offices = [
  { name: "VPSEA Office", code: "VPSEA", admins: 4, scholarships: ["Academic", "Renewals"] },
  { name: "UniFAST Office", code: "UFA", admins: 3, scholarships: ["TES", "TDP", "FHE"] },
  { name: "Registrar's Office", code: "REG", admins: 2, scholarships: ["Records"] },
  { name: "Sports Office", code: "SPO", admins: 1, scholarships: ["Sports"] },
];

function O() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {offices.map(o => (
        <Card key={o.code} className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary"><Building2 className="h-5 w-5" /></div>
            <div><p className="font-semibold">{o.name}</p><p className="text-xs text-muted-foreground">{o.code}</p></div>
          </div>
          <div className="text-sm space-y-1">
            <p><span className="text-muted-foreground">Admins:</span> {o.admins}</p>
            <p><span className="text-muted-foreground">Manages:</span> {o.scholarships.join(", ")}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
