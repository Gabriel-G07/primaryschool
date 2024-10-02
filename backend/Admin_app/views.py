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
        '/token/refresh/',
        '/jobs/applications/',
        ''
    ]
    return Response(routes)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

class CustomTokenRefreshView(TokenRefreshView):
    def dispatch(self, request, *args, **kwargs):
        response = super().dispatch(request, *args, **kwargs)
        response.set_cookie('csrftoken', get_token(request))
        return response
    
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
        if kwargs.get('template') == 'index':
            return render(request, 'index.html')
        elif kwargs.get('template') == 'jobs_applications':
            form = JobApplicationsForm()
            return render(request, 'website/Applications/staff_applications.html', {'form': form})
        elif kwargs.get('template') == 'students_applications':
            form = StudentEnrolmentForm()
            return render(request, 'website/Applications/student_applications.html', {'form': form})

    def post(self, request, *args, **kwargs):
        if kwargs.get('template') == 'jobs_applications':
            form = JobApplicationsForm(request.POST)
            if form.is_valid():
                form.save()
                return redirect('jobs_applications')
        elif kwargs.get('template') == 'students_applications':
            form = StudentEnrolmentForm(request.POST)
            if form.is_valid():
                form.save()
                return redirect('students_applications')
        return render(request, 'website/Applications/staff_applications.html', {'form': form})


class StaffDetailView(APIView):
    def get(self, request):
        username = request.user.username
        try:
            staff = Staff.objects.get(Username=username)
            serializer = StaffSerializer(staff)
            return Response(serializer.data)
        except Staff.DoesNotExist:
            return Response({"error": "Staff not found"}, status=status.HTTP_404_NOT_FOUND)


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
