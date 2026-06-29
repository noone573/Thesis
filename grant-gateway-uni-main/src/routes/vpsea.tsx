import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { LayoutDashboard, FileCheck, RefreshCw, Archive, Upload, BarChart3, Megaphone, FileText } from "lucide-react";

export const Route = createFileRoute("/vpsea")({ component: V });

const nav = [
  { to: "/vpsea", label: "Dashboard", icon: LayoutDashboard },
  { to: "/vpsea/applications", label: "Academic Applications", icon: FileCheck },
  { to: "/vpsea/renewals", label: "Renewal Applications", icon: RefreshCw },
  { to: "/vpsea/archives", label: "Scholarship Archives", icon: Archive },
  { to: "/vpsea/uploads", label: "Excel Uploads", icon: Upload },
  { to: "/vpsea/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/vpsea/announcements", label: "Announcements", icon: Megaphone },
  { to: "/vpsea/reports", label: "Reports", icon: FileText },
];

const titles: Record<string, [string, string]> = {
  "/vpsea": ["VPSEA Dashboard", "Office of the Vice President for Student & External Affairs"],
  "/vpsea/applications": ["Academic Applications", "Validate and manage student applications"],
  "/vpsea/renewals": ["Renewal Applications", "Review continuing scholar renewals"],
  "/vpsea/archives": ["Scholarship Archives", "DOST, CHED, CoScho, Sports, Affirmative, Staff"],
  "/vpsea/uploads": ["Excel Uploads", "Import scholarship records via spreadsheet"],
  "/vpsea/analytics": ["Analytics", "Insights across BiPSU scholarship programs"],
  "/vpsea/announcements": ["Announcements", "Broadcast updates to students"],
  "/vpsea/reports": ["Reports", "Generate institutional scholarship reports"],
};

function V() {
  const path = useRouterState({ select: s => s.location.pathname });
  const key = Object.keys(titles).find(k => path === k || (k !== "/vpsea" && path.startsWith(k))) || "/vpsea";
  const [t, st] = titles[key];
  return (
    <AdminLayout title={t} subtitle={st} brand="VPSEA" nav={nav}
      user={{ name: "Dr. R. Bayhon", role: "VPSEA Admin", initials: "RB" }}>
      <Outlet />
    </AdminLayout>
  );
}
