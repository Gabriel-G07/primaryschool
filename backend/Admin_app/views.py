from pyexpat.errors import messages
from urllib import request
from .forms import *
from .models import *
from .serializer import *
from django.views import View
from django.shortcuts import redirect, render
from django.http import JsonResponse, HttpResponse
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.password_validation import validate_password
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/token/',
        '/register/',
        '/jobs/applications/',
        ''
    ]
    return Response(routes)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
class RegisterStaffView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterStaffSerializer
    
class RegisterStudentView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterStudentSerializer

class UserSettingsView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SettingsSerializer
    
class WebsiteView(View):
    permission_classes = (AllowAny,)
 
    def get(self, request, *args, **kwargs):
        if kwargs.get('template') == 'WebsiteHome':
            return render(request, 'website/home.html')
        elif kwargs.get('template') == 'jobs_applications':
            form = JobApplicationsForm()
            return render(request, 'website/admissions/staff_applications.html', {'form': form})
        elif kwargs.get('template') == 'students_applications':
            form = StudentEnrolmentForm()
            return render(request, 'website/admissions/student_applications.html', {'form': form})
        elif kwargs.get('template') == 'who-we-are':
            return render(request, 'website/about-us/who-we-are.html')
        elif kwargs.get('template') == 'website_message':
            return render(request, 'website/about-us/message.html')
        elif kwargs.get('template') == 'vision-mission-objectives':
            return render(request, 'website/about-us/objectives/vision-mission-objectives.html')
        elif kwargs.get('template') == 'objectives-detail':
            return render(request, 'website/about-us/objectives/objectives-detail.html')
        elif kwargs.get('template') == 'staff&members':
            return render(request, 'website/about-us/staff&members.html')
        elif kwargs.get('template') == 'resources&facilities':
            return render(request, 'website/about-us/resources&facilities.html')
        elif kwargs.get('template') == 'history':
            return render(request, 'website/about-us/history.html')
        elif kwargs.get('template') == 'academic-information':
            return render(request, 'website/academics/academic-information.html')
        elif kwargs.get('template') == 'academic_grades':
            return render(request, 'website/academics/academic-grades.html')
        elif kwargs.get('template') == 'admission-notices':
            return render(request, 'website/admissions/admission-notices.html')
        elif kwargs.get('template') == 'news':
            return render(request, 'website/news/news.html')
        elif kwargs.get('template') == 'event':
            return render(request, 'website/events/event.html')
        elif kwargs.get('template') == 'event-details':
            return render(request, 'website/events/event-details.html')
        elif kwargs.get('template') == 'our-blog':
            return render(request, 'website/blog/our-blog.html')
        elif kwargs.get('template') == 'blog-details':
            return render(request, 'website/blog/blog-details.html')
        elif kwargs.get('template') == 'contact':
            return render(request, 'website/contact/contact.html')
        elif kwargs.get('template') == 'our-team':
            return render(request, 'website/team.html')
        elif kwargs.get('template') == 'service-details':
            return render(request, 'website/about-us/service.html')
        elif kwargs.get('template') == 'gallery':
            return render(request, 'website/resources/gallery.html')
        else:
            return render(request, 'website/resources/error.html', status=404)

    def post(self, request, *args, **kwargs):
        if kwargs.get('template') == 'jobs_applications':
            form = JobApplicationsForm(request.POST)
            if form.is_valid():
                form.save()
                return redirect('WebsiteHome')
        elif kwargs.get('template') == 'students_applications':
            form = StudentEnrolmentForm(request.POST)
            if form.is_valid():
                form.save()
                return redirect('admission-notices')
        return render(request, 'website/home.html', {'form': form})


class StaffDetailView(APIView):
    def get(self, request):
        username = request.user.username
        try:
            staff = Staff.objects.get(Username=username)
            serializer = StaffSerializer(staff)
            return Response(serializer.data)
        except Staff.DoesNotExist:
            return Response({"error": "Staff not found"}, status=status.HTTP_404_NOT_FOUND)

class StudentsDetailView(APIView):
    def get(self, request):
        username = request.user.username
        try:
            student = Students.objects.get(RegNumber=username)
            serializer = StudentsSerializer(student)
            return Response(serializer.data)
        except Students.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
        
class StaffView(APIView):
    def get(self, request):
        staff = Staff.objects.all()
        serializer = StaffSerializer(staff, many=True)
        return Response(serializer.data)
    
class StudentsView(APIView):
    def get(self, request):
        students = Students.objects.all()
        serializer = StudentsSerializer(students, many=True)
        return Response(serializer.data)
    

class JobApplicationsView(APIView):
    def get(self, request):
        staff = JobApplications.objects.all()
        serializer = JobApplicationsSerializer(staff, many=True)
        return Response(serializer.data)
    
class StudentsEnrolmentView(APIView):
    def get(self, request):
        students = StudentsEnrolments.objects.all()
        serializer = StudentsEnrolmentSerializer(students, many=True)
        return Response(serializer.data)
    
    
class AcceptedJobApplicationsView(generics.CreateAPIView):
    queryset = Staff.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = AcceptStaffSerializer
    
class AcceptedStudentsEnrolmentView(generics.CreateAPIView):
    queryset = Students.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = AcceptStudentSerializer
