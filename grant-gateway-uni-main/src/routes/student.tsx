import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { Chatbot } from "@/components/Chatbot";
import { LayoutDashboard, Sparkles, FileText, Bell, GraduationCap, Wallet } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const Route = createFileRoute("/student")({
  component: StudentLayout,
});

const nav = [
  { to: "/student", label: "Dashboard", icon: LayoutDashboard },
  { to: "/student/recommendations", label: "Recommendations", icon: Sparkles },
  { to: "/student/apply/academic", label: "Apply: Academic", icon: GraduationCap },
  { to: "/student/apply/tdp", label: "Apply: TDP", icon: Wallet },
  { to: "/student/applications", label: "My Applications", icon: FileText },
  { to: "/student/notifications", label: "Notifications", icon: Bell },
];

const titles: Record<string, [string, string]> = {
  "/student": ["Welcome back, Juan", "Here's an overview of your scholarship journey"],
  "/student/recommendations": ["Recommended Scholarships", "AI-matched programs tailored to your profile"],
  "/student/apply/academic": ["Academic Scholarship Application", "Submit your application for BiPSU's flagship merit grant"],
  "/student/apply/tdp": ["TDP Scholarship Application", "Tertiary Education Subsidy & Development Program"],
  "/student/applications": ["My Applications", "Track and manage your submitted applications"],
  "/student/notifications": ["Notifications", "Stay up to date with your scholarship activity"],
};

function StudentLayout() {
  const path = useRouterState({ select: s => s.location.pathname });
  const [title, subtitle] = titles[path] || ["Student Portal", "BiPSU SRMS"];
  const { data: profile } = useQuery({ queryKey: ["student-profile"], queryFn: api.getStudentProfile });
  const name = profile?.name ?? "Student";
  const initials = name.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase();
  return (
    <>
      <AdminLayout title={title} subtitle={subtitle} brand="Student" nav={nav}
        user={{ name, role: profile?.student_id ?? "", initials }}>
        <Outlet />
      </AdminLayout>
      <Chatbot />
    </>
  );
}
