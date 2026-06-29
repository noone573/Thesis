import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { api } from "@/lib/api";

export const Route = createFileRoute("/super/logs")({ component: L });

function L() {
  const { data: logs = [] } = useQuery({ queryKey: ["super-logs"], queryFn: api.getLogs });

  return (
    <Card className="p-6">
      <div className="space-y-1">
        {logs.map((l: any) => (
          <div key={l.id} className="flex items-start gap-3 py-3 border-b last:border-0">
            <div className="h-8 w-8 rounded-full bg-primary-soft text-primary flex items-center justify-center"><Activity className="h-4 w-4" /></div>
            <div className="flex-1">
              <p className="text-sm"><span className="font-medium">{l.who}</span> <span className="text-muted-foreground">{l.action}</span></p>
              <p className="text-xs text-muted-foreground mt-0.5">{l.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
