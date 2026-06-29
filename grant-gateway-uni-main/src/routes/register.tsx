import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { api } from "@/lib/api";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [
    { title: "Register — BiPSU SRMS" },
    { name: "description", content: "Create your student account on BiPSU SRMS." },
  ]}),
  component: Register,
});

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</Label>
      {children}
    </div>
  );
}

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    first_name: "Juan", last_name: "Dela Cruz",
    email: "juan.delacruz@bipsu.edu.ph", password: "demo1234",
    student_id: "2022-00451", course: "bscs", year_level: 3,
    gwa: 1.28, family_income: 180000,
    contact_number: "+63 917 555 0142", address: "Naval, Biliran",
    date_of_birth: "2003-08-14", gender: "male",
    indigenous_group: "", parent_employment: "Farmer",
    is_pwd: false, is_athlete: false,
    is_coconut_farmer_family: true, has_other_scholarship: false,
  });

  const set = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  async function handleSubmit() {
    setError("");
    setLoading(true);
    try {
      await api.register({ ...form });
      navigate({ to: "/student" });
    } catch {
      setError("Registration failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-mesh py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <Card className="p-8 card-elev">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Student Registration</h1>
              <p className="text-sm text-muted-foreground">Fill out your profile so we can match you with the right scholarships.</p>
            </div>
          </div>

          <h2 className="text-sm font-semibold mb-4 text-primary">Personal Information</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Field label="Full Name">
              <Input value={form.first_name + " " + form.last_name} onChange={e => {
                const [f, ...l] = e.target.value.split(" ");
                set("first_name", f); set("last_name", l.join(" "));
              }} />
            </Field>
            <Field label="Student ID"><Input value={form.student_id} onChange={e => set("student_id", e.target.value)} /></Field>
            <Field label="Course / Program">
              <Select value={form.course} onValueChange={v => set("course", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="bscs">BS Computer Science</SelectItem>
                  <SelectItem value="bsit">BS Information Technology</SelectItem>
                  <SelectItem value="bsed">BS Education</SelectItem>
                  <SelectItem value="bsn">BS Nursing</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Year Level">
              <Select value={String(form.year_level)} onValueChange={v => set("year_level", Number(v))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{[1,2,3,4].map(y => <SelectItem key={y} value={String(y)}>Year {y}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label="Email"><Input type="email" value={form.email} onChange={e => set("email", e.target.value)} /></Field>
            <Field label="Password"><Input type="password" value={form.password} onChange={e => set("password", e.target.value)} /></Field>
            <Field label="Contact Number"><Input value={form.contact_number} onChange={e => set("contact_number", e.target.value)} /></Field>
            <Field label="Address"><Input value={form.address} onChange={e => set("address", e.target.value)} /></Field>
            <Field label="Date of Birth"><Input type="date" value={form.date_of_birth} onChange={e => set("date_of_birth", e.target.value)} /></Field>
            <Field label="Gender">
              <Select value={form.gender} onValueChange={v => set("gender", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>

          <h2 className="text-sm font-semibold mb-4 text-primary">Scholarship Matching Information</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Field label="GWA"><Input value={String(form.gwa)} onChange={e => set("gwa", parseFloat(e.target.value))} /></Field>
            <Field label="Family Annual Income (₱)"><Input value={String(form.family_income)} onChange={e => set("family_income", parseFloat(e.target.value))} /></Field>
            <Field label="Indigenous Group"><Input value={form.indigenous_group} onChange={e => set("indigenous_group", e.target.value)} placeholder="N/A or specify" /></Field>
            <Field label="Parent Employment"><Input value={form.parent_employment} onChange={e => set("parent_employment", e.target.value)} /></Field>
            <div className="md:col-span-2 grid sm:grid-cols-3 gap-4 pt-2">
              <label className="flex items-center justify-between rounded-lg border p-3"><span className="text-sm">Disability (PWD)</span><Switch checked={form.is_pwd} onCheckedChange={v => set("is_pwd", v)} /></label>
              <label className="flex items-center justify-between rounded-lg border p-3"><span className="text-sm">Varsity Athlete</span><Switch checked={form.is_athlete} onCheckedChange={v => set("is_athlete", v)} /></label>
              <label className="flex items-center justify-between rounded-lg border p-3"><span className="text-sm">Coconut Farmer Family</span><Switch checked={form.is_coconut_farmer_family} onCheckedChange={v => set("is_coconut_farmer_family", v)} /></label>
              <label className="flex items-center justify-between rounded-lg border p-3 sm:col-span-3"><span className="text-sm">Currently holds another scholarship</span><Switch checked={form.has_other_scholarship} onCheckedChange={v => set("has_other_scholarship", v)} /></label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            {error && <p className="text-sm text-destructive mr-auto self-center">{error}</p>}
            <Button variant="outline" onClick={() => navigate({ to: "/" })}>Clear Form</Button>
            <Button onClick={handleSubmit} disabled={loading}>{loading ? "Registering…" : "Register & Continue"}</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
