import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { GraduationCap, Shield, Wallet, Settings2, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "BiPSU SRMS — Scholarship Recommendation & Management System" },
    { name: "description", content: "Biliran Province State University's intelligent scholarship recommendation and management platform." },
  ]}),
  component: Landing,
});

const portals = [
  { to: "/student", label: "Student Portal", desc: "Apply, track, and get matched", icon: GraduationCap, role: "Student" },
  { to: "/vpsea", label: "VPSEA Admin", desc: "Validate & manage scholars", icon: Shield, role: "VPSEA Admin" },
  { to: "/unifast", label: "UniFAST Admin", desc: "TES, TDP & billing operations", icon: Wallet, role: "UniFAST Admin" },
  { to: "/super", label: "Super Admin", desc: "Users, roles & system settings", icon: Settings2, role: "Super Admin" },
];

const roleRoutes: Record<string, string> = {
  student: '/student',
  vpsea: '/vpsea',
  unifast: '/unifast',
  super: '/super',
};

function Landing() {
  const [tab, setTab] = useState<"login" | "select">("select");
  const [email, setEmail] = useState('juan.delacruz@bipsu.edu.ph');
  const [password, setPassword] = useState('demo1234');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const role = await login(email, password);
      navigate({ to: roleRoutes[role] ?? '/student' });
    } catch {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-mesh">
      <header className="flex items-center justify-between px-6 lg:px-12 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground card-elev">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold leading-tight">BiPSU SRMS</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Biliran Province State University</p>
          </div>
        </div>
        <Link to="/register"><Button variant="outline">Register</Button></Link>
      </header>

      <main className="px-6 lg:px-12 pb-16">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs text-primary mb-6">
              <Sparkles className="h-3 w-3" /> AI-powered scholarship matching
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              The smartest way to find, apply, and manage your <span className="text-primary">scholarship journey</span>.
            </h1>
            <p className="mt-5 text-muted-foreground text-lg">
              BiPSU's unified platform recommends scholarships using content-based filtering, streamlines applications,
              and gives VPSEA & UniFAST admins powerful tools to manage the entire scholar lifecycle.
            </p>
            <ul className="mt-6 space-y-2">
              {[
                "Personalized scholarship recommendations",
                "Automated eligibility validation",
                "Real-time application tracking",
                "Excel-based archive management",
              ].map(t => (
                <li key={t} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-success" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <Card className="p-6 lg:p-8 card-elev">
            <div className="flex gap-2 mb-6 p-1 rounded-lg bg-muted w-fit">
              <button onClick={() => setTab("select")}
                className={`px-3 py-1.5 text-sm rounded-md ${tab === "select" ? "bg-card shadow font-medium" : "text-muted-foreground"}`}>
                Choose portal
              </button>
              <button onClick={() => setTab("login")}
                className={`px-3 py-1.5 text-sm rounded-md ${tab === "login" ? "bg-card shadow font-medium" : "text-muted-foreground"}`}>
                Student login
              </button>
            </div>

            {tab === "select" ? (
              <div className="grid sm:grid-cols-2 gap-3">
                {portals.map(p => {
                  const Icon = p.icon;
                  return (
                    <Link key={p.to} to={p.to}
                      className="group flex flex-col gap-2 p-4 rounded-xl border bg-card hover:border-primary hover:bg-primary-soft/40 transition">
                      <div className="flex items-center justify-between">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                          <Icon className="h-4 w-4" />
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition" />
                      </div>
                      <p className="font-medium text-sm">{p.label}</p>
                      <p className="text-xs text-muted-foreground">{p.desc}</p>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="pwd">Password</Label>
                  <Input id="pwd" type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1.5" />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox defaultChecked /> Remember me
                  </label>
                  <a className="text-sm text-primary hover:underline" href="#">Forgot password?</a>
                </div>
                <Button className="w-full" size="lg" disabled={loading}>
                  {loading ? 'Signing in…' : 'Sign in'}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  New here? <Link to="/register" className="text-primary hover:underline">Create account</Link>
                </p>
              </form>
            )}
          </Card>
        </div>

        <div className="mt-20 max-w-6xl mx-auto grid sm:grid-cols-3 gap-4">
          {[
            { k: "2,450+", v: "Active scholars" },
            { k: "8", v: "Scholarship programs" },
            { k: "₱14.6M", v: "Disbursed this year" },
          ].map(s => (
            <Card key={s.v} className="p-6 text-center">
              <p className="text-3xl font-bold text-primary">{s.k}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.v}</p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
