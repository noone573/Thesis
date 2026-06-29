import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { LayoutDashboard, FileCheck, Coins, RefreshCw, Receipt, Send, FileBarChart, Archive, BarChart3, FileText } from "lucide-react";

export const Route = createFileRoute("/unifast")({ component: U });

const nav = [
  { to: "/unifast", label: "Dashboard", icon: LayoutDashboard },
  { to: "/unifast/tdp", label: "TDP Applications", icon: FileCheck },
  { to: "/unifast/tes", label: "TES Processing", icon: Coins },
  { to: "/unifast/continuing", label: "Continuing TES", icon: RefreshCw },
  { to: "/unifast/billing", label: "Billing", icon: Receipt },
  { to: "/unifast/distribution", label: "Distribution", icon: Send },
  { to: "/unifast/liquidation", label: "Liquidation", icon: FileBarChart },
  { to: "/unifast/fhe", label: "FHE Records", icon: Archive },
  { to: "/unifast/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/unifast/reports", label: "Reports", icon: FileText },
];

const titles: Record<string, [string, string]> = {
  "/unifast": ["UniFAST Dashboard", "Unified Financial Assistance System for Tertiary Education"],
  "/unifast/tdp": ["TDP Applications", "Tertiary Education Subsidy applications"],
  "/unifast/tes": ["TES Processing", "Workflow for Tertiary Education Subsidy"],
  "/unifast/continuing": ["Continuing TES Grantees", "Returning TES beneficiaries"],
  "/unifast/billing": ["Billing Management", "Manage billing submissions and approvals"],
  "/unifast/distribution": ["Distribution", "Fund release and claim tracking"],
  "/unifast/liquidation": ["Liquidation", "Liquidation reports & submission tracking"],
  "/unifast/fhe": ["FHE Records", "Free Higher Education enrollment & eligibility"],
  "/unifast/analytics": ["Analytics", "Financial assistance performance insights"],
  "/unifast/reports": ["Reports", "Generate UniFAST compliance reports"],
};

function U() {
  const path = useRouterState({ select: s => s.location.pathname });
  const key = Object.keys(titles).find(k => path === k || (k !== "/unifast" && path.startsWith(k))) || "/unifast";
  const [t, st] = titles[key];
  return (
    <AdminLayout title={t} subtitle={st} brand="UniFAST" nav={nav}
      user={{ name: "Engr. M. Tabuga", role: "UniFAST Admin", initials: "MT" }}>
      <Outlet />
    </AdminLayout>
  );
}
