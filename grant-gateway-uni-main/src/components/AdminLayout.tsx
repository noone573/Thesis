import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Search, ChevronDown, LogOut, GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export interface NavItem { to: string; label: string; icon: React.ComponentType<{ className?: string }>; }

interface Props {
  title: string;
  subtitle: string;
  brand: string;
  user: { name: string; role: string; initials: string };
  nav: NavItem[];
  children: React.ReactNode;
  notifCount?: number;
}

export function AdminLayout({ title, subtitle, brand, user, nav, children, notifCount = 4 }: Props) {
  const path = useRouterState({ select: s => s.location.pathname });
  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
        <div className="flex items-center gap-2 px-6 py-5 border-b border-sidebar-border">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-sidebar-foreground">BiPSU SRMS</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{brand}</p>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {nav.map(item => {
            const active = path === item.to || (item.to !== "/" && path.startsWith(item.to));
            const Icon = item.icon;
            return (
              <Link key={item.to} to={item.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  active ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-sidebar-foreground hover:bg-sidebar-accent/60"
                }`}>
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <Link to="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent/60">
            <LogOut className="h-4 w-4" /> Sign out
          </Link>
        </div>
      </aside>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-card/80 backdrop-blur px-4 lg:px-8">
          <div className="min-w-0">
            <h1 className="text-lg font-semibold truncate">{title}</h1>
            <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search…" className="w-64 pl-9" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="p-2 space-y-2 max-h-80 overflow-y-auto">
                  <NotifRow color="success" title="New TES disbursement released" time="10 min ago" />
                  <NotifRow color="warning" title="Liquidation deadline approaching" time="2 hr ago" />
                  <NotifRow color="info" title="3 new academic applications" time="4 hr ago" />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 hover:bg-muted">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">{user.initials}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-xs font-medium leading-tight">{user.name}</p>
                    <p className="text-[10px] text-muted-foreground leading-tight">{user.role}</p>
                  </div>
                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link to="/">Sign out</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 px-4 lg:px-8 py-6">{children}</main>
      </div>
    </div>
  );
}

function NotifRow({ color, title, time }: { color: "success" | "warning" | "info"; title: string; time: string }) {
  const map = { success: "bg-success", warning: "bg-warning", info: "bg-info" };
  return (
    <div className="flex gap-2 p-2 rounded-lg hover:bg-muted">
      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${map[color]}`} />
      <div className="min-w-0">
        <p className="text-sm font-medium truncate">{title}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "Approved": "bg-success/10 text-success border-success/20",
    "Pending Validation": "bg-warning/10 text-warning-foreground border-warning/30",
    "Rejected": "bg-destructive/10 text-destructive border-destructive/20",
    "Needs Revision": "bg-info/10 text-info border-info/20",
    "Active": "bg-success/10 text-success border-success/20",
    "Inactive": "bg-muted text-muted-foreground border-border",
    "Draft": "bg-muted text-muted-foreground border-border",
  };
  return <Badge variant="outline" className={map[status] || ""}>{status}</Badge>;
}
