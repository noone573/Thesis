import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/student/apply/academic")({
  component: Apply,
});

const docs = [
  { name: "Certificate of Grades", size: "412 KB", status: "uploaded" },
  { name: "Certificate of Enrollment", size: "208 KB", status: "uploaded" },
  { name: "Prospectus", size: "1.2 MB", status: "uploaded" },
  { name: "Good Moral Certificate", size: "—", status: "missing" },
  { name: "2x2 ID Picture", size: "98 KB", status: "uploaded" },
  { name: "Study Load", size: "—", status: "missing" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="p-6">
      <h3 className="text-sm font-semibold mb-4 text-primary uppercase tracking-wider">{title}</h3>
      {children}
    </Card>
  );
}
function F({ label, ...p }: any) {
  return <div className="space-y-1.5"><Label className="text-xs">{label}</Label><Input {...p} /></div>;
}

function Apply() {
  const [gwa] = useState(1.28);
  const classification = gwa <= 1.29 ? "University Scholar" : gwa <= 1.50 ? "College Scholar" : "Not Eligible";
  const eligible = gwa <= 1.50;
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Section title="Personal Information">
          <div className="grid sm:grid-cols-2 gap-4">
            <F label="Student Number" defaultValue="2022-00451" />
            <F label="Course" defaultValue="BS Computer Science" />
            <F label="Name" defaultValue="Juan Dela Cruz" />
            <F label="Age" defaultValue="21" />
            <F label="Birth Date" type="date" defaultValue="2003-08-14" />
            <F label="Religion" defaultValue="Roman Catholic" />
            <F label="Citizenship" defaultValue="Filipino" />
            <F label="Gender" defaultValue="Male" />
            <F label="Civil Status" defaultValue="Single" />
            <F label="Contact Number" defaultValue="+63 917 555 0142" />
          </div>
        </Section>

        <Section title="Educational Background">
          <div className="grid sm:grid-cols-2 gap-4">
            <F label="Elementary School" defaultValue="Naval Central School" />
            <F label="High School" defaultValue="Biliran National High" />
            <F label="Last School Attended" defaultValue="Biliran National High" />
          </div>
        </Section>

        <Section title="Family Background">
          <div className="grid sm:grid-cols-2 gap-4">
            <F label="Father's Name" defaultValue="Pedro Dela Cruz" />
            <F label="Father's Occupation" defaultValue="Coconut Farmer" />
            <F label="Mother's Name" defaultValue="Rosa Dela Cruz" />
            <F label="Mother's Occupation" defaultValue="Housekeeper" />
            <F label="Address" defaultValue="Brgy. Calumpang, Naval, Biliran" />
          </div>
        </Section>

        <Section title="Academic Information">
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <F label="GWA" defaultValue={gwa} />
            <F label="Semester" defaultValue="2nd Semester" />
            <F label="School Year" defaultValue="2024-2025" />
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-xs font-medium mb-3">Subject Grades</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[["Data Structures","1.25"],["Calculus II","1.50"],["Discrete Math","1.00"],["English","1.25"],["PE 2","1.25"],["NSTP","1.25"]].map(([s,g]) => (
                <div key={s} className="flex justify-between p-2 rounded bg-muted/50"><span className="text-muted-foreground">{s}</span><span className="font-medium">{g}</span></div>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Document Upload">
          <div className="border-2 border-dashed rounded-xl p-8 text-center bg-muted/30 mb-4">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm font-medium">Drag & drop files here or click to upload</p>
            <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG · Max 5MB each</p>
          </div>
          <div className="space-y-2">
            {docs.map(d => (
              <div key={d.name} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.size}</p>
                  </div>
                </div>
                {d.status === "uploaded" ? (
                  <Badge className="bg-success/10 text-success border-success/20" variant="outline"><CheckCircle2 className="h-3 w-3 mr-1" /> Uploaded</Badge>
                ) : (
                  <Badge variant="outline" className="bg-warning/10 text-warning-foreground border-warning/30"><AlertCircle className="h-3 w-3 mr-1" /> Required</Badge>
                )}
              </div>
            ))}
          </div>
        </Section>
      </div>

      <div className="space-y-6">
        <Card className="p-6 sticky top-24">
          <div className="flex items-center gap-2 mb-3"><Sparkles className="h-4 w-4 text-primary" /><h3 className="font-semibold">Auto-Validation</h3></div>
          <p className="text-xs text-muted-foreground mb-4">Real-time eligibility evaluation based on submitted data.</p>
          <div className={`p-4 rounded-xl ${eligible ? "bg-success/10" : "bg-destructive/10"}`}>
            <p className="text-xs uppercase tracking-wider opacity-70">Result</p>
            <p className={`text-xl font-bold mt-1 ${eligible ? "text-success" : "text-destructive"}`}>{classification}</p>
            <p className="text-xs mt-2">GWA {gwa} · No grade above 2.5 ✓</p>
          </div>
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex justify-between"><span>Rule: GWA ≤ 1.29</span><Badge variant="outline" className="bg-success/10 text-success border-success/20">Pass</Badge></div>
            <div className="flex justify-between"><span>Rule: No failing grade</span><Badge variant="outline" className="bg-success/10 text-success border-success/20">Pass</Badge></div>
            <div className="flex justify-between"><span>Documents complete</span><Badge variant="outline" className="bg-warning/10 text-warning-foreground border-warning/30">2 missing</Badge></div>
          </div>
          <Button className="w-full mt-6">Submit Application</Button>
          <Button variant="outline" className="w-full mt-2">Save as Draft</Button>
        </Card>
      </div>
    </div>
  );
}
