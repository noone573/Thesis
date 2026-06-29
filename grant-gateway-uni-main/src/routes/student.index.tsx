import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, FileText, CheckCircle2, Bell, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, RadialBarChart, RadialBar } from "recharts";

export const Route = createFileRoute("/student/")({ component: StudentDashboard });

function StatCard({ icon: Icon, label, value, hint, color }: any) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{hint}</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}

function StudentDashboard() {
  const { data: dashboard } = useQuery({ queryKey: ["student-dashboard"], queryFn: api.getStudentDashboard });
  const { data: scholarships = [] } = useQuery({ queryKey: ["scholarships"], queryFn: api.getScholarships });
  const { data: announcements = [] } = useQuery({ queryKey: ["student-announcements"], queryFn: api.getStudentAnnouncements });
  const { data: profile } = useQuery({ queryKey: ["student-profile"], queryFn: api.getStudentProfile });

  const matchScores = scholarships.map((s: any) => ({ name: s.name.split(" ")[0], score: s.match }));
  const topMatch = Math.max(...scholarships.map((s: any) => s.match ?? 0), 0);
  const timelineEvents = [
    { date: "Apr 12", title: "Application Submitted", status: "done" },
    { date: "Apr 15", title: "Documents Validated", status: "done" },
    { date: "Apr 22", title: "Endorsed to VPSEA", status: "done" },
    { date: "Apr 25", title: "Approved as University Scholar", status: "done" },
    { date: "May 30", title: "Renewal Window Opens", status: "upcoming" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Sparkles} label="Recommended" value={dashboard?.recommended_count ?? scholarships.length} hint="Matched scholarships" color="bg-primary-soft text-primary" />
        <StatCard icon={FileText} label="Pending" value={dashboard?.pending_count ?? "—"} hint="Under review" color="bg-warning/15 text-warning-foreground" />
        <StatCard icon={CheckCircle2} label="Approved" value={dashboard?.approved_count ?? "—"} hint="Active scholar status" color="bg-success/15 text-success" />
        <StatCard icon={Bell} label="Notifications" value={dashboard?.notification_count ?? "—"} hint="Check notifications" color="bg-info/15 text-info" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Scholarship Match Scores</h3>
              <p className="text-xs text-muted-foreground">Based on content-based filtering & cosine similarity</p>
            </div>
            <Badge variant="outline" className="bg-primary-soft text-primary border-primary/20">
              <TrendingUp className="h-3 w-3 mr-1" /> Strong match
            </Badge>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={matchScores}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Bar dataKey="score" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-1">Profile Strength</h3>
          <p className="text-xs text-muted-foreground mb-4">Top match: Academic Scholarship</p>
          <ResponsiveContainer width="100%" height={200}>
            <RadialBarChart innerRadius="60%" outerRadius="100%" data={[{ name: "score", value: topMatch, fill: "var(--chart-1)" }]} startAngle={90} endAngle={-270}>
              <RadialBar dataKey="value" cornerRadius={20} background={{ fill: "var(--muted)" }} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="text-center -mt-32 mb-20">
            <p className="text-3xl font-bold">{topMatch}%</p>
            <p className="text-xs text-muted-foreground">match score</p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">GWA</span><span className="font-medium">{profile?.gwa}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Course</span><span className="font-medium">{profile?.course}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Year</span><span className="font-medium">Year {profile?.year_level}</span></div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recommended Scholarships</h3>
            <Link to="/student/recommendations" className="text-xs text-primary hover:underline inline-flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {scholarships.slice(0, 3).map((s: any) => (
              <div key={s.name} className="p-4 rounded-xl border hover:border-primary transition">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <p className="font-medium">{s.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
                  </div>
                  <Badge className="bg-primary-soft text-primary border-0 shrink-0">{s.match}% Match</Badge>
                </div>
                <Progress value={s.match} className="h-1.5 mt-3" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Calendar className="h-4 w-4" /> Application Timeline</h3>
          <div className="space-y-4">
            {timelineEvents.map((e, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`h-3 w-3 rounded-full ${e.status === "done" ? "bg-success" : "bg-muted border-2 border-border"}`} />
                  {i < timelineEvents.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                </div>
                <div className="pb-4">
                  <p className="text-xs text-muted-foreground">{e.date}</p>
                  <p className="text-sm font-medium">{e.title}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Recent Announcements</h3>
          <Button variant="ghost" size="sm">View all</Button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {announcements.slice(0, 3).map((a: any) => (
            <div key={a.title} className="p-4 rounded-xl bg-muted/50">
              <p className="text-xs text-muted-foreground">{a.date}</p>
              <p className="font-medium text-sm mt-1">{a.title}</p>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{a.body}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
