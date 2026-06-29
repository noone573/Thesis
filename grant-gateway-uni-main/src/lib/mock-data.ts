export type ScholarshipType = "Academic" | "TDP" | "DOST" | "CHED" | "CoScho" | "Sports" | "Affirmative" | "Staff";

export interface Scholarship {
  name: string;
  type: ScholarshipType;
  category: "application" | "recommendation";
  match: number;
  description: string;
  requirements: string[];
  eligibility: string;
}

export const scholarships: Scholarship[] = [
  { name: "Academic Scholarship", type: "Academic", category: "application", match: 96,
    description: "BiPSU's flagship merit scholarship for outstanding students with exemplary GWA.",
    requirements: ["Certificate of Grades", "Certificate of Enrollment", "Prospectus", "Good Moral", "2x2 ID", "Study Load"],
    eligibility: "GWA 1.00–1.50, no grade above 2.5" },
  { name: "TDP Scholarship", type: "TDP", category: "application", match: 88,
    description: "Tertiary Education Subsidy & TDP grant for indigent but deserving students.",
    requirements: ["COR/COE", "Certificate of Indigency"],
    eligibility: "Indigent family, enrolled BiPSU student" },
  { name: "DOST Merit Scholarship", type: "DOST", category: "recommendation", match: 90,
    description: "DOST-SEI scholarship for STEM students with academic excellence.",
    requirements: ["DOST application form", "HS Card", "Income Tax Return"],
    eligibility: "STEM course, high GWA, passed DOST exam" },
  { name: "CHED Merit", type: "CHED", category: "recommendation", match: 85,
    description: "CHED-funded merit scholarship for qualified college students.",
    requirements: ["CHED form", "Income proof", "Grades"],
    eligibility: "GWA ≥ 1.75, family income ≤ ₱300k" },
  { name: "CoScho (Coconut Farmers)", type: "CoScho", category: "recommendation", match: 72,
    description: "Scholarship for children of registered coconut farmers.",
    requirements: ["PCA Certification", "Birth Certificate"],
    eligibility: "Child of registered coconut farmer" },
  { name: "Sports Scholarship", type: "Sports", category: "recommendation", match: 65,
    description: "Grant for varsity athletes representing BiPSU.",
    requirements: ["Athlete Certification", "Coach endorsement"],
    eligibility: "Active varsity athlete" },
  { name: "Affirmative Action", type: "Affirmative", category: "recommendation", match: 70,
    description: "Support for Indigenous Peoples and students with disabilities.",
    requirements: ["IP Certification or PWD ID"],
    eligibility: "IP member or PWD" },
  { name: "Staff Scholarship", type: "Staff", category: "recommendation", match: 60,
    description: "Tuition support for dependents of BiPSU employees.",
    requirements: ["HR Certification"],
    eligibility: "Dependent of BiPSU employee" },
];

export const studentProfile = {
  name: "Juan Dela Cruz",
  studentId: "2022-00451",
  course: "BS Computer Science",
  year: "3rd Year",
  gwa: 1.28,
  email: "juan.delacruz@bipsu.edu.ph",
  avatar: "JD",
};

export const applications = [
  { id: "APP-2025-0021", scholarship: "Academic Scholarship", date: "2025-04-12", status: "Approved", remarks: "University Scholar", updated: "2025-04-25" },
  { id: "APP-2025-0042", scholarship: "TDP Scholarship", date: "2025-04-18", status: "Pending Validation", remarks: "Awaiting document review", updated: "2025-04-20" },
  { id: "APP-2024-0987", scholarship: "Academic Scholarship", date: "2024-09-03", status: "Approved", remarks: "College Scholar", updated: "2024-09-21" },
  { id: "APP-2025-0107", scholarship: "TDP Scholarship", date: "2025-05-02", status: "Needs Revision", remarks: "Re-upload Certificate of Indigency", updated: "2025-05-09" },
];

export const notifications = [
  { id: 1, type: "success", title: "Application Approved", body: "Your Academic Scholarship application has been approved as University Scholar.", time: "2h ago" },
  { id: 2, type: "warning", title: "Document Required", body: "Please re-upload your Certificate of Indigency for TDP review.", time: "1d ago" },
  { id: 3, type: "info", title: "New Scholarship Match", body: "You're 90% matched with DOST Merit Scholarship.", time: "3d ago" },
  { id: 4, type: "info", title: "Renewal Reminder", body: "Submit your renewal requirements before May 30, 2025.", time: "5d ago" },
];

export const matchScores = scholarships.map(s => ({ name: s.name.split(" ")[0], score: s.match }));

export const timelineEvents = [
  { date: "Apr 12", title: "Application Submitted", status: "done" },
  { date: "Apr 15", title: "Documents Validated", status: "done" },
  { date: "Apr 22", title: "Endorsed to VPSEA", status: "done" },
  { date: "Apr 25", title: "Approved as University Scholar", status: "done" },
  { date: "May 30", title: "Renewal Window Opens", status: "upcoming" },
];

// Admin mock data
export const vpseaApplicants = Array.from({ length: 24 }, (_, i) => ({
  id: `APP-2025-${String(100 + i).padStart(4, "0")}`,
  name: ["Maria Santos", "Pedro Reyes", "Anna Cruz", "Mark Lim", "Jasmine Tan", "Carlo Aquino", "Liza Ong", "Ben Co"][i % 8] + ` ${i+1}`,
  course: ["BSCS", "BSED", "BSIT", "BSN", "BSA", "BSBA"][i % 6],
  year: (i % 4) + 1,
  gwa: +(1.0 + (i % 15) * 0.1).toFixed(2),
  scholarship: ["Academic", "TDP"][i % 2],
  status: ["Pending Validation", "Approved", "Rejected", "Needs Revision"][i % 4],
  date: `2025-${String((i % 5) + 1).padStart(2, "0")}-${String((i % 27) + 1).padStart(2, "0")}`,
}));

export const courseDistribution = [
  { course: "BSCS", scholars: 48 },
  { course: "BSIT", scholars: 36 },
  { course: "BSED", scholars: 52 },
  { course: "BSN", scholars: 41 },
  { course: "BSA", scholars: 29 },
  { course: "BSBA", scholars: 33 },
];

export const gpaDistribution = [
  { range: "1.00-1.25", count: 28 },
  { range: "1.26-1.50", count: 64 },
  { range: "1.51-1.75", count: 87 },
  { range: "1.76-2.00", count: 52 },
  { range: "2.01-2.50", count: 31 },
];

export const approvalTrend = [
  { month: "Jan", approved: 24, rejected: 6 },
  { month: "Feb", approved: 32, rejected: 9 },
  { month: "Mar", approved: 41, rejected: 7 },
  { month: "Apr", approved: 55, rejected: 12 },
  { month: "May", approved: 48, rejected: 10 },
  { month: "Jun", approved: 38, rejected: 8 },
];

export const scholarshipDistribution = [
  { name: "Academic", value: 124, fill: "var(--chart-1)" },
  { name: "TDP", value: 96, fill: "var(--chart-2)" },
  { name: "DOST", value: 42, fill: "var(--chart-3)" },
  { name: "CHED", value: 67, fill: "var(--chart-4)" },
  { name: "Others", value: 38, fill: "var(--chart-5)" },
];

export const tesDisbursement = [
  { semester: "1st 2023", amount: 2400000 },
  { semester: "2nd 2023", amount: 2650000 },
  { semester: "1st 2024", amount: 2890000 },
  { semester: "2nd 2024", amount: 3120000 },
  { semester: "1st 2025", amount: 3450000 },
];

export const adminUsers = [
  { id: 1, name: "Dr. Rosario Bayhon", email: "vpsea@bipsu.edu.ph", role: "VPSEA Admin", status: "Active" },
  { id: 2, name: "Engr. Marlon Tabuga", email: "unifast@bipsu.edu.ph", role: "UniFAST Admin", status: "Active" },
  { id: 3, name: "Prof. Lourdes Quezon", email: "registrar@bipsu.edu.ph", role: "VPSEA Admin", status: "Active" },
  { id: 4, name: "Ms. Helen Sumagaysay", email: "tdp@bipsu.edu.ph", role: "UniFAST Admin", status: "Inactive" },
  { id: 5, name: "IT Admin", email: "it@bipsu.edu.ph", role: "Super Admin", status: "Active" },
];

export const announcements = [
  { title: "Academic Scholarship A.Y. 2025-2026 Now Open", date: "May 10, 2025", body: "Applications for the next academic year are now being accepted until June 15." },
  { title: "TDP Liquidation Deadline Extended", date: "May 5, 2025", body: "UniFAST has extended the liquidation deadline to May 31, 2025." },
  { title: "DOST Scholarship Exam Schedule", date: "Apr 28, 2025", body: "The DOST-SEI exam will be held on July 6, 2025." },
];
