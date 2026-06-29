const BASE = 'http://localhost:8000/api';

function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Token ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request('/auth/login/', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (data: Record<string, unknown>) =>
    request('/auth/register/', { method: 'POST', body: JSON.stringify(data) }),
  logout: () => request('/auth/logout/', { method: 'POST' }),

  // Student
  getStudentProfile: () => request('/student/profile/'),
  getStudentDashboard: () => request('/student/dashboard/'),
  getScholarships: () => request('/student/scholarships/'),
  getApplications: () => request('/student/applications/'),
  submitApplication: (data: Record<string, unknown>) =>
    request('/student/applications/', { method: 'POST', body: JSON.stringify(data) }),
  updateApplication: (id: number, data: Record<string, unknown>) =>
    request(`/student/applications/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
  getNotifications: () => request('/student/notifications/'),
  getStudentAnnouncements: () => request('/student/announcements/'),

  // VPSEA
  getVPSEADashboard: () => request('/vpsea/dashboard/'),
  getVPSEAApplications: () => request('/vpsea/applications/'),
  updateVPSEAApplication: (id: number, data: Record<string, unknown>) =>
    request(`/vpsea/applications/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
  getRenewals: () => request('/vpsea/renewals/'),
  updateRenewal: (id: number, data: Record<string, unknown>) =>
    request(`/vpsea/renewals/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
  getArchives: (type: string) => request(`/vpsea/archives/${type}/`),
  getVPSEAAnalytics: () => request('/vpsea/analytics/'),
  getVPSEAAnnouncements: () => request('/vpsea/announcements/'),
  createVPSEAAnnouncement: (data: Record<string, unknown>) =>
    request('/vpsea/announcements/', { method: 'POST', body: JSON.stringify(data) }),
  getVPSEAReports: () => request('/vpsea/reports/'),

  // UniFAST
  getUniFASTDashboard: () => request('/unifast/dashboard/'),
  getTDPApplications: () => request('/unifast/tdp/'),
  updateTDPApplication: (id: number, data: Record<string, unknown>) =>
    request(`/unifast/tdp/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
  getTESWorkflow: () => request('/unifast/tes/'),
  getContinuingTES: () => request('/unifast/continuing/'),
  getBilling: () => request('/unifast/billing/'),
  getDistribution: () => request('/unifast/distribution/'),
  getLiquidation: () => request('/unifast/liquidation/'),
  getFHE: () => request('/unifast/fhe/'),
  getUniFASTAnalytics: () => request('/unifast/analytics/'),
  getUniFASTReports: () => request('/unifast/reports/'),

  // Super Admin
  getSuperDashboard: () => request('/super/dashboard/'),
  getUsers: () => request('/super/users/'),
  createUser: (data: Record<string, unknown>) =>
    request('/super/users/', { method: 'POST', body: JSON.stringify(data) }),
  updateUser: (id: number, data: Record<string, unknown>) =>
    request(`/super/users/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
  getOffices: () => request('/super/offices/'),
  getCategories: () => request('/super/categories/'),
  getSuperAnnouncements: () => request('/super/announcements/'),
  createSuperAnnouncement: (data: Record<string, unknown>) =>
    request('/super/announcements/', { method: 'POST', body: JSON.stringify(data) }),
  getLogs: () => request('/super/logs/'),
  getSettings: () => request('/super/settings/'),
  updateSettings: (data: Record<string, unknown>) =>
    request('/super/settings/', { method: 'PATCH', body: JSON.stringify(data) }),
};
