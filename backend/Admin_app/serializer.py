import uuid
from .models import *
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.db.models.signals import post_save
from django.dispatch import receiver

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'role', 'bio', 'image', 'verified')
        extra_kwargs = {
            'username': {'read_only': True},
            'image': {'read_only': True}
        }

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'username'
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['role'] = user.role
        token['bio'] = user.bio
        token['image'] = str(user.image)
        token['verified'] = user.verified

        return token


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'

class StudentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Students
        fields = '__all__'


class JobApplicationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplications
        fields = '__all__'

class StudentsEnrolmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentsEnrolments
        fields = '__all__'



@receiver(post_save, sender=Staff)
def update_user(sender, instance, **kwargs):
    try:
        user = User.objects.get(username=instance.Username)
    except User.DoesNotExist:
        return

    user.first_name = instance.Name
    user.last_name = instance.Surname
    user.email = instance.Email
    user.role = instance.Position
    user.save()
    
@receiver(post_save, sender=Students)
def update_user(sender, instance, **kwargs):
    try:
        user = User.objects.get(username=instance.RegNumber)
    except User.DoesNotExist:
        return

    user.first_name = instance.Name
    user.last_name = instance.Surname
    user.email = instance.Email
    user.role = instance.Grade_Level
    user.save()

        
class RegisterStaffSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'first_name', 'last_name', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Passwords dodn't match!"})
            
        password = attrs['password']
        if len(password) < 8:
            raise serializers.ValidationError(
                {"password": "Password must be at least 8 characters long."})
        if not any(char.isdigit() for char in password):
            raise serializers.ValidationError(
                {"password": "Password must contain at least one digit."})
        if not any(char.isalpha() for char in password):
            raise serializers.ValidationError(
                {"password": "Password must contain at least one letter."})

        return attrs

    def create(self, validated_data):
        email = validated_data['email']
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']
        username = validated_data['username']
        
        try:
            staff = Staff.objects.get(Email=email, Name=first_name, Surname=last_name)
            Staff.objects.filter(Email=email).update(Username=username)
            user, created = User.objects.get_or_create(
                username=username,
                defaults={
                    'username' : username,
                    'first_name' : staff.Name,
                    'last_name' : staff.Surname,
                    'email' : staff.Email,
                    'role' : staff.Position,

                }
            )
        except Staff.DoesNotExist:
            raise serializers.ValidationError(
                {"email": "Staff with this email, first name and last name does not exist."})

        user.set_password(validated_data['password'])
        user.save()

        return user
        
class RegisterStudentSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'first_name', 'last_name', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Passwords dodn't match!"})
            
        password = attrs['password']
        if len(password) < 8:
            raise serializers.ValidationError(
                {"password": "Password must be at least 8 characters long."})
        if not any(char.isdigit() for char in password):
            raise serializers.ValidationError(
                {"password": "Password must contain at least one digit."})
        if not any(char.isalpha() for char in password):
            raise serializers.ValidationError(
                {"password": "Password must contain at least one letter."})

        return attrs

    def create(self, validated_data):
        email = validated_data['email']
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']
        username = validated_data['username']
        
        try:
            staff = Students.objects.get(RegNumber=username, Email=email, Name=first_name, Surname=last_name)
            user, created = User.objects.get_or_create(
                username=username,
                defaults={
                    'username' : staff.RegNumber,
                    'first_name' : staff.Name,
                    'last_name' : staff.Surname,
                    'email' : staff.Email,
                    'role' : 'Student'

                }
            )
        except Students.DoesNotExist:
            raise serializers.ValidationError(
                {"email": "Student Doesn't Exist Please Check your details"})

        user.set_password(validated_data['password'])
        user.save()

        return user



class SettingsSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('password', 'password2')
       
class AcceptStaffSerializer(serializers.ModelSerializer):

    class Meta:
        model = Staff
        fields = ('Email',)
        
    def create(self, validated_data):
        email = validated_data['Email']

        try:
            staff_emplyment = JobApplications.objects.get(Email=email)
            if Staff.objects.filter(Email=email).exists() or Students.objects.filter(Email=email).exists():
                validated_data['enrolled'] = True
            
            username = str(uuid.uuid4())[:30]
            staff, created = Staff.objects.get_or_create(
                Email=email,
                defaults={
                    'Username': username,
                    'Name': staff_emplyment.Name,
                    'Surname': staff_emplyment.Surname,
                    'Position': staff_emplyment.pPosition,
                    'DOB': staff_emplyment.DOB,
                    'Marital_Status': staff_emplyment.Marital_Status,
                    'Gender': staff_emplyment.Gender,
                    
                }
            )

            if not created:
                staff.Name = staff_emplyment.Name
                staff.Surname = staff_emplyment.Surname
                staff.Position = staff_emplyment.pPosition
                staff.DOB = staff_emplyment.DOB
                staff.Marital_Status = staff_emplyment.Marital_Status
                staff.Gender = staff_emplyment.Gender
                staff.save()

        except JobApplications.DoesNotExist:
            raise serializers.ValidationError(
                {"email": "Staff with this email does not exist."})

        return staff
    

class AcceptStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Students
        fields = ('Email',)

    def create(self, validated_data):
        email = validated_data['Email']
        
        if not email:
            raise serializers.ValidationError({"email": "Email cannot be empty"})

        try:
            student_enrolment = StudentsEnrolments.objects.get(Email=email)
            if Staff.objects.filter(Email=email).exists() or Students.objects.filter(Email=email).exists():
                validated_data['enrolled'] = True
            year = timezone.now().year
            random_digits = random.randint(1000, 9999)
            random_letter = random.choice(string.ascii_uppercase)
            RegNumber = f"M{year % 100}{random_digits}{random_letter}"

            student, created = Students.objects.get_or_create(
                Email=email,
                defaults={
                    'Name': student_enrolment.Name,
                    'Surname': student_enrolment.Surname,
                    'Grade_Level': student_enrolment.Grade_Level,
                    'DOB': student_enrolment.DOB,
                    'Address': student_enrolment.Address,
                    'Gender': student_enrolment.Gender,
                    'RegNumber': RegNumber
                }
            )

            if not created:
                student.Name = student_enrolment.Name
                student.Surname = student_enrolment.Surname
                student.Grade_Level = student_enrolment.Grade_Level
                student.DOB = student_enrolment.DOB
                student.Address = student_enrolment.Address
                student.Gender = student_enrolment.Gender
                student.RegNumber = RegNumber
                student.save()

        except StudentsEnrolments.DoesNotExist:
            raise serializers.ValidationError(
                {"email": "Student with this email does not exist."})

        return student
    
