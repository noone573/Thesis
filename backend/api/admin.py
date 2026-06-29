from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import (
    User, StudentProfile, Scholarship, Application, ApplicationDocument,
    Notification, Announcement, Renewal, ArchiveRecord, BillingRecord,
    LiquidationRecord, TDPApplication, Office, ActivityLog, SystemSettings,
)

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (('Role', {'fields': ('role',)}),)

admin.site.register(StudentProfile)
admin.site.register(Scholarship)
admin.site.register(Application)
admin.site.register(ApplicationDocument)
admin.site.register(Notification)
admin.site.register(Announcement)
admin.site.register(Renewal)
admin.site.register(ArchiveRecord)
admin.site.register(BillingRecord)
admin.site.register(LiquidationRecord)
admin.site.register(TDPApplication)
admin.site.register(Office)
admin.site.register(ActivityLog)
admin.site.register(SystemSettings)
