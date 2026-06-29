import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, Info, Bell } from "lucide-react";
import { api } from "@/lib/api";

export const Route = createFileRoute("/student/notifications")({ component: Notifs });

const icons = { success: CheckCircle2, warning: AlertTriangle, info: Info } as const;
const colors = {
  success: "bg-success/10 text-success",
  warning: "bg-warning/15 text-warning-foreground",
  info: "bg-info/10 text-info",
} as const;

function Notifs() {
  const { data: notifications = [] } = useQuery({ queryKey: ["notifications"], queryFn: api.getNotifications });

  return (
    <div className="space-y-3 max-w-3xl">
      {notifications.map((n: any) => {
        const Icon = icons[n.type as keyof typeof icons] || Bell;
        return (
          <Card key={n.id} className="p-4 flex gap-4">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colors[n.type as keyof typeof colors]}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-sm">{n.title}</p>
                <span className="text-xs text-muted-foreground shrink-0">{n.time}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{n.body}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
