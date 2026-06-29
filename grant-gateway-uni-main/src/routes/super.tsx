import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { LayoutDashboard, Users, Building2, Tags, Megaphone, Settings, Activity } from "lucide-react";

export const Route = createFileRoute("/super")({ component: S });

const nav = [
  { to: "/super", label: "Dashboard", icon: LayoutDashboard },
  { to: "/super/users", label: "User Management", icon: Users },
  { to: "/super/offices", label: "Office Accounts", icon: Building2 },
  { to: "/super/categories", label: "Scholarship Categories", icon: Tags },
  { to: "/super/announcements", label: "Announcements", icon: Megaphone },
  { to: "/super/settings", label: "System Settings", icon: Settings },
  { to: "/super/logs", label: "Activity Logs", icon: Activity },
];

const titles: Record<string, [string, string]> = {
  "/super": ["Super Admin Dashboard", "Centralized system control"],
  "/super/users": ["User Management", "Manage all admin and student accounts"],
  "/super/offices": ["Office Accounts", "Departmental account management"],
  "/super/categories": ["Scholarship Categories", "Configure scholarship programs"],
  "/super/announcements": ["Announcements", "System-wide announcements"],
  "/super/settings": ["System Settings", "Global platform configuration"],
  "/super/logs": ["Activity Logs", "Audit trail of system activity"],
};

function S() {
  const path = useRouterState({ select: s => s.location.pathname });
  const key = Object.keys(titles).find(k => path === k || (k !== "/super" && path.startsWith(k))) || "/super";
  const [t, st] = titles[key];
  return (
    <AdminLayout title={t} subtitle={st} brand="Super Admin" nav={nav}
      user={{ name: "IT Admin", role: "Super Admin", initials: "IT" }}>
      <Outlet />
    </AdminLayout>
  );
}
