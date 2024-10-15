from django.urls import path
from . import views
from .views import *
from django.urls import re_path

urlpatterns = [
    path('routes/', views.getRoutes),
    
    #Web Site Urls
    path('', WebsiteView.as_view(), name='WebsiteHome', kwargs={'template': 'WebsiteHome'}),
    path('home/', WebsiteView.as_view(), name='WebsiteHome', kwargs={'template': 'WebsiteHome'}),
    path('jobs/applications/', WebsiteView.as_view(), name='jobs_applications', kwargs={'template': 'jobs_applications'}),
    path('student/application/', WebsiteView.as_view(), name='students_applications', kwargs={'template': 'students_applications'}),
    path('aboutus/', WebsiteView.as_view(), name='who-we-are', kwargs={'template': 'who-we-are'}),
    path('message/', WebsiteView.as_view(), name='website_message', kwargs={'template': 'website_message'}),
    path('visions/missions/objectives/', WebsiteView.as_view(), name='vision-mission-objectives', kwargs={'template': 'vision-mission-objectives'}),
    path('team/staff/', WebsiteView.as_view(), name='staff&members', kwargs={'template': 'staff&members'}),
    path('academics/resources/', WebsiteView.as_view(), name='resources&facilities', kwargs={'template': 'resources&facilities'}),
    path('history/', WebsiteView.as_view(), name='history', kwargs={'template': 'history'}),
    path('academics/information/', WebsiteView.as_view(), name='academic-information', kwargs={'template': 'academic-information'}),
    path('academics/grades/', WebsiteView.as_view(), name='academic_grades', kwargs={'template': 'academic_grades'}),
    path('admissions/notes/', WebsiteView.as_view(), name='admission-notices', kwargs={'template': 'admission-notices'}),
    path('news/', WebsiteView.as_view(), name='news', kwargs={'template': 'news'}),
    path('events/', WebsiteView.as_view(), name='event', kwargs={'template': 'event'}),
    path('events/details/', WebsiteView.as_view(), name='event-details', kwargs={'template': 'event-details'}),
    path('blog/', WebsiteView.as_view(), name='our-blog', kwargs={'template': 'our-blog'}),
    path('blog/details/', WebsiteView.as_view(), name='blog-details', kwargs={'template': 'blog-details'}),
    path('contact-details/', WebsiteView.as_view(), name='contact', kwargs={'template': 'contact'}),
    path('team/', WebsiteView.as_view(), name='our-team', kwargs={'template': 'our-team'}),
    path('objectives/details/', WebsiteView.as_view(), name='objectives-detail', kwargs={'template': 'objectives-detail'}),
    path('services/details/', WebsiteView.as_view(), name='service-details', kwargs={'template': 'service-details'}),
    path('gallery/', WebsiteView.as_view(), name='gallery', kwargs={'template': 'gallery'}),
    re_path(r'^.*$', WebsiteView.as_view(), name='error'),
 
    
    #Signup urls
    path('admin_token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('student_token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/staff/', RegisterStaffView.as_view(), name='auth_register_staff'),
    path('register/student/', RegisterStudentView.as_view(), name='auth_register_student'),
    
    
    #Main Admin
    path('staff/details/', StaffDetailView.as_view(), name='staff_details'),
    path('staff/', StaffView.as_view(), name='staff'),
    path('students/', StudentsView.as_view(), name='students'),
    path('staff/job/applications/', JobApplicationsView.as_view(), name='staff_job_applications'),
    path('students/enrolments/', StudentsEnrolmentView.as_view(), name='students_enrolments'),
    path('staff/job/applications/accepted/', AcceptedJobApplicationsView.as_view(), name='staff_job_applications_accepted'),
    path('students/enrolments/accepted/', AcceptedStudentsEnrolmentView.as_view(), name='students_enrolments_accepted'),
    
    #Students
    path('Student/dashboard/', StudentsDetailView.as_view(), name='Students_details'),
    path('Student/details/', StudentsDetailView.as_view(), name='Students_details'),
    path('Student/notices/', StudentsDetailView.as_view(), name='Students_details'),
    path('Student/classes/', StudentsDetailView.as_view(), name='Students_details'),
    path('Student/library/', StudentsDetailView.as_view(), name='Students_details'),
    path('Student/results/', StudentsDetailView.as_view(), name='Students_details'),
    path('Student/timetables/', StudentsDetailView.as_view(), name='Students_details'),
    
]