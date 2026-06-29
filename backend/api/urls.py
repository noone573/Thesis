from django.urls import path
from . import views

urlpatterns = [
    # Auth
    path('auth/register/', views.RegisterView.as_view()),
    path('auth/login/', views.LoginView.as_view()),
    path('auth/logout/', views.LogoutView.as_view()),

    # Student
    path('student/profile/', views.StudentProfileView.as_view()),
    path('student/dashboard/', views.StudentDashboardView.as_view()),
    path('student/scholarships/', views.ScholarshipListView.as_view()),
    path('student/applications/', views.StudentApplicationListCreateView.as_view()),
    path('student/applications/<int:pk>/', views.StudentApplicationDetailView.as_view()),
    path('student/notifications/', views.NotificationListView.as_view()),
    path('student/announcements/', views.StudentAnnouncementListView.as_view()),

    # VPSEA
    path('vpsea/dashboard/', views.VPSEADashboardView.as_view()),
    path('vpsea/applications/', views.VPSEAApplicationListView.as_view()),
    path('vpsea/applications/<int:pk>/', views.VPSEAApplicationDetailView.as_view()),
    path('vpsea/renewals/', views.VPSEARenewalListView.as_view()),
    path('vpsea/renewals/<int:pk>/', views.VPSEARenewalDetailView.as_view()),
    path('vpsea/archives/<str:type>/', views.VPSEAArchiveListView.as_view()),
    path('vpsea/archives/<str:type>/upload/', views.VPSEAArchiveUploadView.as_view()),
    path('vpsea/analytics/', views.VPSEAAnalyticsView.as_view()),
    path('vpsea/announcements/', views.VPSEAAnnouncementListCreateView.as_view()),
    path('vpsea/reports/', views.VPSEAReportsView.as_view()),

    # UniFAST
    path('unifast/dashboard/', views.UniFASTDashboardView.as_view()),
    path('unifast/tdp/', views.UniFASTTDPListView.as_view()),
    path('unifast/tdp/<int:pk>/', views.UniFASTTDPDetailView.as_view()),
    path('unifast/tes/', views.UniFASTTESView.as_view()),
    path('unifast/continuing/', views.UniFASTContinuingView.as_view()),
    path('unifast/billing/', views.UniFASTBillingListView.as_view()),
    path('unifast/distribution/', views.UniFASTDistributionView.as_view()),
    path('unifast/liquidation/', views.UniFASTLiquidationListView.as_view()),
    path('unifast/fhe/', views.UniFASTFHEView.as_view()),
    path('unifast/fhe/upload/', views.UniFASTFHEUploadView.as_view()),
    path('unifast/analytics/', views.UniFASTAnalyticsView.as_view()),
    path('unifast/reports/', views.UniFASTReportsView.as_view()),

    # Super Admin
    path('super/dashboard/', views.SuperDashboardView.as_view()),
    path('super/users/', views.SuperUserListCreateView.as_view()),
    path('super/users/<int:pk>/', views.SuperUserDetailView.as_view()),
    path('super/offices/', views.SuperOfficeListView.as_view()),
    path('super/categories/', views.SuperCategoryListView.as_view()),
    path('super/announcements/', views.SuperAnnouncementListCreateView.as_view()),
    path('super/logs/', views.SuperLogsView.as_view()),
    path('super/settings/', views.SuperSettingsView.as_view()),
]
