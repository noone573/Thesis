import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

export const Route = createFileRoute("/super/categories")({ component: C });

function C() {
  const { data: scholarships = [] } = useQuery({ queryKey: ["categories"], queryFn: api.getCategories });

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {scholarships.map((s: any) => (
        <Card key={s.id} className="p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold">{s.name}</p>
            <Badge variant="outline" className={s.category === "application" ? "bg-success/10 text-success border-success/20" : "bg-info/10 text-info border-info/20"}>
              {s.category === "application" ? "Application" : "Recommendation"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{s.description}</p>
          <p className="text-xs text-muted-foreground mt-3">Requirements: {s.requirements?.length ?? 0}</p>
        </Card>
      ))}
    </div>
  );
}
