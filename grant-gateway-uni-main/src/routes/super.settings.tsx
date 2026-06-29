import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/super/settings")({ component: S });

function Row({ label, hint, children }: any) {
  return <div className="flex items-center justify-between gap-4 py-3 border-b last:border-0">
    <div><p className="text-sm font-medium">{label}</p>{hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>
    {children}
  </div>;
}

function S() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="font-semibold mb-2">Academic Year</h3>
        <Row label="Current A.Y." hint="Drives default filters across the system">
          <Select defaultValue="2025"><SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="2024">2024-2025</SelectItem><SelectItem value="2025">2025-2026</SelectItem></SelectContent>
          </Select>
        </Row>
        <Row label="Active Semester">
          <Select defaultValue="1"><SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="1">1st Semester</SelectItem><SelectItem value="2">2nd Semester</SelectItem></SelectContent>
          </Select>
        </Row>
      </Card>
      <Card className="p-6">
        <h3 className="font-semibold mb-2">Notifications</h3>
        <Row label="Email notifications" hint="Send updates to student emails"><Switch defaultChecked /></Row>
        <Row label="SMS alerts" hint="Critical-only via Globe/Smart"><Switch /></Row>
        <Row label="In-app push" hint="Browser & PWA"><Switch defaultChecked /></Row>
      </Card>
      <Card className="p-6">
        <h3 className="font-semibold mb-2">File Uploads</h3>
        <Row label="Max file size">
          <Input className="w-32" defaultValue="5 MB" />
        </Row>
        <Row label="Allowed formats"><Input className="w-44" defaultValue="PDF, JPG, PNG" /></Row>
      </Card>
      <Card className="p-6">
        <h3 className="font-semibold mb-2">Portal Appearance</h3>
        <Row label="Primary color">
          <div className="flex gap-2">{["#3b66d1","#0d7a5f","#c46c2e","#5b3aa6"].map(c => <button key={c} className="h-7 w-7 rounded-full ring-2 ring-offset-2 ring-transparent hover:ring-primary" style={{background: c}} />)}</div>
        </Row>
        <Row label="Show match scores" hint="Display % match on student cards"><Switch defaultChecked /></Row>
        <div className="pt-4"><Button className="w-full">Save Changes</Button></div>
      </Card>
    </div>
  );
}
