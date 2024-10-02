from django import forms
from .models import *

class AddUserStaffForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'role', 'email', 'password']
        labels = {
            'username': 'Username',
            'first_name': 'First Name',
            'last_name': 'Last Name',
            'role': 'Role',
            'email': 'Email',
            'password': 'Password',
        }
        
    def clean(self):
        cleaned_data = super().clean()
        first_name = cleaned_data.get('first_name')
        last_name = cleaned_data.get('last_name')
        email = cleaned_data.get('email')
        staff = Staff.objects.filter(first_name=first_name, last_name=last_name, email=email)
        if not staff.exists():
            raise forms.ValidationError("Staff information not found.")
        return cleaned_data
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data['role'],
        )
        return user

class AddStudentsForm(forms.ModelForm):
    class Meta:
        model = Students
        fields = ['Name', 'Surname', 'Gender', 'DOB', 'Email', 'Grade_Level', 'Address']
        labels = {
            'Name': 'Name',
            'Surname': 'Surname',
            'Gender': 'Gender',
            'DOB': 'Date of Birth',
            'Email': 'Email',
            'Grade_Level': 'Grade Level',
            'Address': 'Address',
        }

class EditStudentForm(forms.ModelForm):
    class Meta:
        model = Students
        exclude = ['RegNumber']  # Exclude RegNumber field
        fields = ['Name', 'Surname', 'Gender', 'DOB', 'Email', 'Grade_Level', 'Address']
        labels = {
            'Name': 'Name',
            'Surname': 'Surname',
            'Gender': 'Gender',
            'DOB': 'Date of Birth',
            'Email': 'Email',
            'Grade_Level': 'Grade Level',
            'Address': 'Address',
        }

class AddStaffForm(forms.ModelForm):
    class Meta:
        model = Staff
        fields = ['Username', 'Name', 'Surname', 'Gender', 'Position', 'DOB', 'Marital_Status', 'Email']
        labels = {
            'Username': 'Username',
            'Name': 'Name',
            'Surname': 'Surname',
            'Gender': 'Gender',
            'Position': 'Position',
            'DOB': 'DOB',
            'Marital_Status': 'Marital_Status',
            'Email': 'Email',
        }


class StudentEnrolmentForm(forms.ModelForm):
    class Meta:
        model = StudentsEnrolments
        fields = ['Name', 'Surname', 'Gender', 'DOB', 'Email', 'Grade_Level', 'Address']
        labels = {
            'Name': 'Name',
            'Surname': 'Surname',
            'Gender': 'Gender',
            'DOB': 'Date of Birth',
            'Email': 'Email',
            'Grade_Level': 'Grade Level',
            'Address': 'Address',
        }
        widgets = {
            'DOB': forms.DateInput(attrs={'type': 'date'}),
        }

class EditStudentEnrolmentForm(forms.ModelForm):
    class Meta:
        model = StudentsEnrolments
        exclude = ['RegNumber'] 
        fields = ['Name', 'Surname', 'Gender', 'DOB', 'Email', 'Grade_Level', 'Address']
        labels = {
            'Name': 'Name',
            'Surname': 'Surname',
            'Gender': 'Gender',
            'DOB': 'Date of Birth',
            'Email': 'Email',
            'Grade_Level': 'Grade Level',
            'Address': 'Address',
        }

class JobApplicationsForm(forms.ModelForm):
    class Meta:
        model = JobApplications
        fields = ['Name', 'Surname', 'Gender', 'pPosition', 'DOB', 'Marital_Status', 'Email']
        labels = {
            'Name': 'Name',
            'Surname': 'Surname',
            'Gender': 'Gender',
            'pPosition': 'Prospactive Position',
            'DOB': 'Date of Birth',
            'Marital_Status': 'Marital Status',
            'Email': 'Email',
        }
        widgets = {
            'DOB': forms.DateInput(attrs={'type': 'date'}),
        }