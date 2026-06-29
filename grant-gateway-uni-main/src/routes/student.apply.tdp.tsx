import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/student/apply/tdp")({
  component: TDP,
});

function F({ label, ...p }: any) {
  return <div className="space-y-1.5"><Label className="text-xs">{label}</Label><Input {...p} /></div>;
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <Card className="p-6"><h3 className="text-sm font-semibold mb-4 text-primary uppercase tracking-wider">{title}</h3>{children}</Card>;
}

function TDP() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Section title="Personal Information">
          <div className="grid sm:grid-cols-2 gap-4">
            <F label="Full Name" defaultValue="Juan Dela Cruz" />
            <F label="Date of Birth" type="date" defaultValue="2003-08-14" />
            <F label="Address" defaultValue="Naval, Biliran" />
            <F label="School" defaultValue="BiPSU" />
            <F label="Campus" defaultValue="Main Campus" />
            <F label="Course" defaultValue="BS Computer Science" />
            <F label="Year Level" defaultValue="3rd Year" />
            <F label="School ID" defaultValue="2022-00451" />
            <F label="Citizenship" defaultValue="Filipino" />
            <F label="Contact Number" defaultValue="+63 917 555 0142" />
          </div>
        </Section>
        <Section title="Family Background">
          <div className="grid sm:grid-cols-2 gap-4">
            <F label="Father's Name" defaultValue="Pedro Dela Cruz" />
            <F label="Father's Address" defaultValue="Naval, Biliran" />
            <F label="Mother's Name" defaultValue="Rosa Dela Cruz" />
            <F label="Mother's Address" defaultValue="Naval, Biliran" />
          </div>
        </Section>
        <Section title="Educational Assistance">
          <F label="Existing scholarship / financial assistance" defaultValue="None" />
        </Section>
        <Section title="Required Documents">
          <div className="border-2 border-dashed rounded-xl p-8 text-center bg-muted/30 mb-4">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm font-medium">Drop documents to upload</p>
            <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG · Max 5MB</p>
          </div>
          {[["COR / COE","320 KB"],["Certificate of Indigency","186 KB"]].map(([n, s]) => (
            <div key={n} className="flex items-center justify-between p-3 rounded-lg border mt-2">
              <div className="flex items-center gap-3"><FileText className="h-4 w-4 text-muted-foreground" />
                <div><p className="text-sm font-medium">{n}</p><p className="text-xs text-muted-foreground">{s}</p></div>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20"><CheckCircle2 className="h-3 w-3 mr-1" /> Uploaded</Badge>
            </div>
          ))}
        </Section>
      </div>
      <div>
        <Card className="p-6 sticky top-24">
          <h3 className="font-semibold mb-2">Submission Summary</h3>
          <p className="text-xs text-muted-foreground mb-4">Review before submitting to UniFAST for processing.</p>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between"><span>Profile complete</span><Badge variant="outline" className="bg-success/10 text-success border-success/20">100%</Badge></div>
            <div className="flex justify-between"><span>Documents</span><Badge variant="outline" className="bg-success/10 text-success border-success/20">2/2</Badge></div>
            <div className="flex justify-between"><span>Eligibility</span><Badge variant="outline" className="bg-success/10 text-success border-success/20">Qualified</Badge></div>
          </div>
          <Button className="w-full">Submit to UniFAST</Button>
          <Button variant="outline" className="w-full mt-2">Save as Draft</Button>
        </Card>
      </div>
    </div>
  );
}
