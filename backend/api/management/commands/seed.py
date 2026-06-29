from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from api.models import (
    StudentProfile, Scholarship, Application, Notification,
    Announcement, BillingRecord, LiquidationRecord, TDPApplication,
    Office, ActivityLog, SystemSettings, Renewal, ArchiveRecord,
)
from rest_framework.authtoken.models import Token
import datetime

User = get_user_model()


class Command(BaseCommand):
    help = 'Seed the database with initial data matching the mock data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding database...')

        # System settings
        SystemSettings.objects.get_or_create(pk=1)

        # Super admin
        super_user, _ = User.objects.get_or_create(
            email='it@bipsu.edu.ph',
            defaults={'username': 'it@bipsu.edu.ph', 'first_name': 'IT', 'last_name': 'Admin', 'role': 'super', 'is_staff': True, 'is_superuser': True}
        )
        super_user.set_password('admin1234')
        super_user.save()
        Token.objects.get_or_create(user=super_user)

        # VPSEA admin
        vpsea_user, _ = User.objects.get_or_create(
            email='vpsea@bipsu.edu.ph',
            defaults={'username': 'vpsea@bipsu.edu.ph', 'first_name': 'Rosario', 'last_name': 'Bayhon', 'role': 'vpsea'}
        )
        vpsea_user.set_password('vpsea1234')
        vpsea_user.save()
        Token.objects.get_or_create(user=vpsea_user)

        # UniFAST admin
        unifast_user, _ = User.objects.get_or_create(
            email='unifast@bipsu.edu.ph',
            defaults={'username': 'unifast@bipsu.edu.ph', 'first_name': 'Marlon', 'last_name': 'Tabuga', 'role': 'unifast'}
        )
        unifast_user.set_password('unifast1234')
        unifast_user.save()
        Token.objects.get_or_create(user=unifast_user)

        # Student user
        student_user, _ = User.objects.get_or_create(
            email='juan.delacruz@bipsu.edu.ph',
            defaults={'username': 'juan.delacruz@bipsu.edu.ph', 'first_name': 'Juan', 'last_name': 'Dela Cruz', 'role': 'student'}
        )
        student_user.set_password('demo1234')
        student_user.save()
        Token.objects.get_or_create(user=student_user)

        profile, _ = StudentProfile.objects.get_or_create(
            user=student_user,
            defaults={
                'student_id': '2022-00451',
                'course': 'BS Computer Science',
                'year_level': 3,
                'gwa': 1.28,
                'contact_number': '+63 917 555 0142',
                'address': 'Naval, Biliran',
                'date_of_birth': datetime.date(2003, 8, 14),
                'gender': 'Male',
                'family_income': 180000,
                'parent_employment': 'Farmer',
                'is_coconut_farmer_family': True,
            }
        )

        # Scholarships
        scholarships_data = [
            {'name': 'Academic Scholarship', 'type': 'Academic', 'category': 'application',
             'description': "BiPSU's flagship merit scholarship for outstanding students with exemplary GWA.",
             'requirements': ['Certificate of Grades', 'Certificate of Enrollment', 'Prospectus', 'Good Moral', '2x2 ID', 'Study Load'],
             'eligibility': 'GWA 1.00–1.50, no grade above 2.5'},
            {'name': 'TDP Scholarship', 'type': 'TDP', 'category': 'application',
             'description': 'Tertiary Education Subsidy & TDP grant for indigent but deserving students.',
             'requirements': ['COR/COE', 'Certificate of Indigency'],
             'eligibility': 'Indigent family, enrolled BiPSU student'},
            {'name': 'DOST Merit Scholarship', 'type': 'DOST', 'category': 'recommendation',
             'description': 'DOST-SEI scholarship for STEM students with academic excellence.',
             'requirements': ['DOST application form', 'HS Card', 'Income Tax Return'],
             'eligibility': 'STEM course, high GWA, passed DOST exam'},
            {'name': 'CHED Merit', 'type': 'CHED', 'category': 'recommendation',
             'description': 'CHED-funded merit scholarship for qualified college students.',
             'requirements': ['CHED form', 'Income proof', 'Grades'],
             'eligibility': 'GWA ≥ 1.75, family income ≤ ₱300k'},
            {'name': 'CoScho (Coconut Farmers)', 'type': 'CoScho', 'category': 'recommendation',
             'description': 'Scholarship for children of registered coconut farmers.',
             'requirements': ['PCA Certification', 'Birth Certificate'],
             'eligibility': 'Child of registered coconut farmer'},
            {'name': 'Sports Scholarship', 'type': 'Sports', 'category': 'recommendation',
             'description': 'Grant for varsity athletes representing BiPSU.',
             'requirements': ['Athlete Certification', 'Coach endorsement'],
             'eligibility': 'Active varsity athlete'},
            {'name': 'Affirmative Action', 'type': 'Affirmative', 'category': 'recommendation',
             'description': 'Support for Indigenous Peoples and students with disabilities.',
             'requirements': ['IP Certification or PWD ID'],
             'eligibility': 'IP member or PWD'},
            {'name': 'Staff Scholarship', 'type': 'Staff', 'category': 'recommendation',
             'description': 'Tuition support for dependents of BiPSU employees.',
             'requirements': ['HR Certification'],
             'eligibility': 'Dependent of BiPSU employee'},
        ]
        for s in scholarships_data:
            Scholarship.objects.get_or_create(name=s['name'], defaults=s)

        # Applications
        academic = Scholarship.objects.get(type='Academic')
        tdp = Scholarship.objects.get(type='TDP')
        apps_data = [
            {'scholarship': academic, 'status': 'Approved', 'remarks': 'University Scholar', 'submitted_at': datetime.date(2025, 4, 12)},
            {'scholarship': tdp, 'status': 'Pending Validation', 'remarks': 'Awaiting document review', 'submitted_at': datetime.date(2025, 4, 18)},
            {'scholarship': academic, 'status': 'Approved', 'remarks': 'College Scholar', 'submitted_at': datetime.date(2024, 9, 3)},
            {'scholarship': tdp, 'status': 'Needs Revision', 'remarks': 'Re-upload Certificate of Indigency', 'submitted_at': datetime.date(2025, 5, 2)},
        ]
        for a in apps_data:
            if not Application.objects.filter(student=profile, scholarship=a['scholarship'], submitted_at=a['submitted_at']).exists():
                Application.objects.create(student=profile, **a)

        # Notifications
        notifs = [
            {'type': 'success', 'title': 'Application Approved', 'body': 'Your Academic Scholarship application has been approved as University Scholar.'},
            {'type': 'warning', 'title': 'Document Required', 'body': 'Please re-upload your Certificate of Indigency for TDP review.'},
            {'type': 'info', 'title': 'New Scholarship Match', 'body': "You're 90% matched with DOST Merit Scholarship."},
            {'type': 'info', 'title': 'Renewal Reminder', 'body': 'Submit your renewal requirements before May 30, 2025.'},
        ]
        for n in notifs:
            Notification.objects.get_or_create(student=profile, title=n['title'], defaults=n)

        # Announcements
        ann_data = [
            {'title': 'Academic Scholarship A.Y. 2025-2026 Now Open', 'body': 'Applications for the next academic year are now being accepted until June 15.'},
            {'title': 'TDP Liquidation Deadline Extended', 'body': 'UniFAST has extended the liquidation deadline to May 31, 2025.'},
            {'title': 'DOST Scholarship Exam Schedule', 'body': 'The DOST-SEI exam will be held on July 6, 2025.'},
        ]
        for a in ann_data:
            Announcement.objects.get_or_create(title=a['title'], defaults={**a, 'published_by': super_user})

        # Billing records
        billing_data = [
            {'semester': '1st 2025', 'amount': 1240000, 'submitted_at': datetime.date(2025, 4, 12), 'status': 'Approved'},
            {'semester': '1st 2025', 'amount': 840000, 'submitted_at': datetime.date(2025, 4, 18), 'status': 'Pending Validation'},
            {'semester': '1st 2025', 'amount': 660000, 'submitted_at': datetime.date(2025, 4, 22), 'status': 'Approved'},
            {'semester': '1st 2025', 'amount': 320000, 'submitted_at': datetime.date(2025, 4, 28), 'status': 'Needs Revision'},
            {'semester': '2nd 2024', 'amount': 980000, 'submitted_at': datetime.date(2025, 3, 15), 'status': 'Approved'},
        ]
        for b in billing_data:
            BillingRecord.objects.get_or_create(semester=b['semester'], amount=b['amount'], defaults=b)

        # Liquidation records
        liq_data = [
            {'batch': 'Batch 1', 'amount': 420000, 'submitted_at': datetime.date(2025, 4, 25), 'status': 'Approved'},
            {'batch': 'Batch 1', 'amount': 380000, 'submitted_at': datetime.date(2025, 4, 28), 'status': 'Approved'},
            {'batch': 'Batch 2', 'amount': 290000, 'submitted_at': datetime.date(2025, 5, 6), 'status': 'Pending Validation'},
            {'batch': 'Batch 2', 'amount': 240000, 'submitted_at': datetime.date(2025, 5, 9), 'status': 'Needs Revision'},
            {'batch': 'Batch 2', 'amount': 195000, 'submitted_at': datetime.date(2025, 5, 12), 'status': 'Pending Validation'},
        ]
        for l in liq_data:
            LiquidationRecord.objects.get_or_create(batch=l['batch'], amount=l['amount'], defaults=l)

        # Offices
        offices_data = [
            {'name': 'VPSEA Office', 'code': 'VPSEA', 'manages': ['Academic', 'Renewals']},
            {'name': 'UniFAST Office', 'code': 'UFA', 'manages': ['TES', 'TDP', 'FHE']},
            {'name': "Registrar's Office", 'code': 'REG', 'manages': ['Records']},
            {'name': 'Sports Office', 'code': 'SPO', 'manages': ['Sports']},
        ]
        for o in offices_data:
            Office.objects.get_or_create(code=o['code'], defaults=o)

        # Activity logs
        logs_data = [
            (vpsea_user, 'Approved application APP-2025-0021'),
            (unifast_user, 'Released TES Batch 2 funds'),
            (vpsea_user, 'Imported ched_merit_2024.csv'),
            (super_user, 'Updated system settings'),
        ]
        for user, action in logs_data:
            ActivityLog.objects.get_or_create(user=user, action=action)

        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))
        self.stdout.write('\nLogin credentials:')
        self.stdout.write('  Student:   juan.delacruz@bipsu.edu.ph / demo1234')
        self.stdout.write('  VPSEA:     vpsea@bipsu.edu.ph / vpsea1234')
        self.stdout.write('  UniFAST:   unifast@bipsu.edu.ph / unifast1234')
        self.stdout.write('  Super:     it@bipsu.edu.ph / admin1234')
