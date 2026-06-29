import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckCircle2, Info, Lock } from "lucide-react";
import { api } from "@/lib/api";

export const Route = createFileRoute("/student/recommendations")({ component: Recs });

function ScholarshipCard({ s }: { s: any }) {
  const isApp = s.category === "application";
  return (
    <Card className="p-5 flex flex-col">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold">{s.name}</h3>
            <Badge variant="outline" className={isApp ? "bg-success/10 text-success border-success/20" : "bg-info/10 text-info border-info/20"}>
              {isApp ? "Apply in-system" : "Recommendation only"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{s.description}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-2xl font-bold text-primary">{s.match}%</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">match</p>
        </div>
      </div>
      <Progress value={s.match} className="h-1.5 mb-4" />
      <div className="space-y-2 text-sm">
        <div className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" /><div><p className="text-xs font-medium">Eligibility</p><p className="text-xs text-muted-foreground">{s.eligibility}</p></div></div>
        <div className="flex gap-2"><Info className="h-4 w-4 text-info shrink-0 mt-0.5" /><div><p className="text-xs font-medium">Requirements</p><p className="text-xs text-muted-foreground">{s.requirements?.join(", ")}</p></div></div>
      </div>
      <div className="mt-4 pt-4 border-t">
        {isApp ? (
          <Link to={s.type === "Academic" ? "/student/apply/academic" : "/student/apply/tdp"}>
            <Button className="w-full">Start Application</Button>
          </Link>
        ) : (
          <Button variant="outline" className="w-full" disabled><Lock className="h-3 w-3 mr-2" /> Apply externally</Button>
        )}
      </div>
    </Card>
  );
}

function Recs() {
  const { data: scholarships = [] } = useQuery({ queryKey: ["scholarships"], queryFn: api.getScholarships });
  const apply = scholarships.filter((s: any) => s.category === "application");
  const rec = scholarships.filter((s: any) => s.category === "recommendation");

  return (
    <Tabs defaultValue="all">
      <TabsList className="mb-4">
        <TabsTrigger value="all">All ({scholarships.length})</TabsTrigger>
        <TabsTrigger value="apply">Application-based ({apply.length})</TabsTrigger>
        <TabsTrigger value="rec">Recommendation ({rec.length})</TabsTrigger>
      </TabsList>
      <TabsContent value="all"><div className="grid md:grid-cols-2 gap-4">{scholarships.map((s: any) => <ScholarshipCard key={s.id} s={s} />)}</div></TabsContent>
      <TabsContent value="apply"><div className="grid md:grid-cols-2 gap-4">{apply.map((s: any) => <ScholarshipCard key={s.id} s={s} />)}</div></TabsContent>
      <TabsContent value="rec"><div className="grid md:grid-cols-2 gap-4">{rec.map((s: any) => <ScholarshipCard key={s.id} s={s} />)}</div></TabsContent>
    </Tabs>
  );
}
