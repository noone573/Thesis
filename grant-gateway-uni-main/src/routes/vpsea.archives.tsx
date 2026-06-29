import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, FileSpreadsheet } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/vpsea/archives")({ component: Arch });

const types = ["DOST","CHED","CoScho","Sports","Affirmative","Staff"];

function sample(t: string) {
  return Array.from({length: 6}, (_, i) => ({
    id: `${t}-${2024}-${String(i+1).padStart(3,"0")}`,
    name: ["J. Cruz","M. Reyes","P. Lim","A. Tan","R. Ong","E. Co"][i],
    course: ["BSCS","BSED","BSIT","BSN","BSA","BSBA"][i],
    gwa: +(1.0 + i*0.15).toFixed(2),
    year: 2020 + (i%5),
  }));
}

function chartData(seed: number) {
  return Array.from({length:5},(_,i)=>({year: 2020+i, scholars: 20+seed*4+i*5}));
}

function ArchView({ t, seed }: { t: string; seed: number }) {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-4 gap-4">
        {[["Total Scholars", String(40+seed*8)],["Top Course","BSCS"],["Avg GWA","1.42"],["A.Y. Covered","2020-2025"]].map(([l,v])=>(
          <Card key={l} className="p-4"><p className="text-xs uppercase text-muted-foreground tracking-wider">{l}</p><p className="text-2xl font-bold mt-1">{v}</p></Card>
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h3 className="font-semibold mb-4">{t} Scholars — Yearly Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData(seed)}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="year" fontSize={11} stroke="var(--muted-foreground)" />
              <YAxis fontSize={11} stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Bar dataKey="scholars" fill="var(--chart-2)" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <div className="border-2 border-dashed rounded-xl p-6 text-center">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm font-medium">Upload Excel/CSV</p>
            <p className="text-xs text-muted-foreground mt-1">Drag .xlsx or .csv</p>
          </div>
          <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2"><FileSpreadsheet className="h-3 w-3" /> Last import: dost_2024.xlsx · 124 rows</p>
        </Card>
      </div>
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Imported Records</h3>
        <Table>
          <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Name</TableHead><TableHead>Course</TableHead><TableHead>GWA</TableHead><TableHead>Year</TableHead></TableRow></TableHeader>
          <TableBody>{sample(t).map(r => (
            <TableRow key={r.id}><TableCell className="font-mono text-xs">{r.id}</TableCell><TableCell className="font-medium">{r.name}</TableCell>
            <TableCell>{r.course}</TableCell><TableCell>{r.gwa}</TableCell><TableCell>{r.year}</TableCell></TableRow>
          ))}</TableBody>
        </Table>
      </Card>
    </div>
  );
}

function Arch() {
  return (
    <Tabs defaultValue="DOST">
      <TabsList className="mb-6 flex-wrap h-auto">{types.map(t => <TabsTrigger key={t} value={t}>{t}</TabsTrigger>)}</TabsList>
      {types.map((t,i) => <TabsContent key={t} value={t}><ArchView t={t} seed={i+1} /></TabsContent>)}
    </Tabs>
  );
}
