from django.urls import path
from . import views
from .views import *




urlpatterns = [
    path('routes/', views.getRoutes),
    
    #Web Site Urls

    path('', WebsiteView.as_view(), name='WebsiteHome', kwargs={'template': 'index'}),
    path('jobs/applications/', WebsiteView.as_view(), name='jobs_applications', kwargs={'template': 'jobs_applications'}),
    path('student/application/', WebsiteView.as_view(), name='students_applications', kwargs={'template': 'students_applications'}),
 
    
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