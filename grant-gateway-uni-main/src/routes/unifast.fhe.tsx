import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Upload } from "lucide-react";

export const Route = createFileRoute("/unifast/fhe")({ component: F });

const enrollment = [
  { course: "BSED", count: 410 },{ course: "BSCS", count: 360 },{ course: "BSIT", count: 290 },
  { course: "BSN", count: 320 },{ course: "BSA", count: 240 },{ course: "BSBA", count: 280 },
];

function F() {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        {[["FHE Eligible","1,902","All campuses"],["Enrolled","1,748","91% utilization"],["Pending Billing","154","To be processed"]].map(s=>(
          <Card key={s[0]} className="p-5"><p className="text-xs uppercase text-muted-foreground tracking-wider">{s[0]}</p>
          <p className="text-3xl font-bold mt-2">{s[1]}</p><p className="text-xs text-muted-foreground mt-1">{s[2]}</p></Card>
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h3 className="font-semibold mb-4">Enrollment by Course</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={enrollment}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="course" fontSize={11} stroke="var(--muted-foreground)" />
              <YAxis fontSize={11} stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Bar dataKey="count" fill="var(--chart-2)" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-3">Billing Templates</h3>
          <div className="border-2 border-dashed rounded-xl p-6 text-center">
            <Upload className="h-7 w-7 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm">Upload FHE template</p>
            <p className="text-xs text-muted-foreground mt-1">.xlsx, .csv</p>
          </div>
          <ul className="mt-4 text-sm space-y-2">
            <li className="p-2 rounded bg-muted/50 flex justify-between"><span>fhe_2025_q1.xlsx</span><span className="text-success">Imported</span></li>
            <li className="p-2 rounded bg-muted/50 flex justify-between"><span>fhe_2024_q4.xlsx</span><span className="text-success">Imported</span></li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
