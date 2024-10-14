import datetime, random, string
from datetime import datetime, timezone
from django.utils import timezone
from django.db import connection, models
from django.contrib.auth.models import AbstractUser, UserManager
from django.db.models.signals import pre_save, post_save


class CustomUserManager(UserManager):
    def create_user(self, username, first_name, last_name, email, password, role):
        email = self.normalize_email(email)
        user = self.model(
            username=username,
            first_name=first_name, 
            last_name=last_name,
            email=email,
            role=role
        )
        user.set_password(password)
        user.last_login = timezone.now()
        user.save(using=self._db)
        return user

class User(AbstractUser):
    class Meta:
        db_table = 'auth_user'
        auto_created = False
    
    username = models.CharField(max_length=150, primary_key=True, unique=True, null=False)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    role = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    is_online = models.BooleanField(default=False)
    last_logout = models.DateTimeField(null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    settings = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to="user_images", default="default.jpg", null=True, blank=True)
    verified = models.BooleanField(default=False)
    
    objects = CustomUserManager()
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'role', 'email']
    
    def __str__(self):
        return self.username
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    def save(self, *args, **kwargs):
        if self.role in ['Teacher', 'Head Master', 'Vice Head Master', 'Director', 'Developer']:
            self.is_staff = True
        else:
            self.is_staff = False

        self.last_login = datetime.now()

        super().save(*args, **kwargs)

class Staff(models.Model):
    class Meta:
        db_table = 'Staff'

    Username = models.CharField(max_length=50, unique=True, null=False)
    Name = models.CharField(max_length=50)
    Surname = models.CharField(max_length=50)
    Gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female')])
    Position = models.CharField(max_length=50)
    DOB = models.DateField(verbose_name="Date of Birth")
    Marital_Status = models.CharField(max_length=20, choices=[('Single', 'Single'), ('Married', 'Married'), ('Divoced', 'Divoced')])
    Email = models.EmailField(unique=True, null=False, primary_key=True)


class Students(models.Model):
    class Meta:
        db_table = 'Students'
        
    RegNumber = models.CharField(max_length=8, primary_key=True, editable=False, unique=True)
    Name = models.CharField(max_length=50)
    Surname = models.CharField(max_length=50)
    Gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female')])
    DOB = models.DateField()
    Email = models.EmailField()
    Grade_Level = models.CharField(max_length=20, choices=[
        ('ECD A', 'ECD A'),
        ('ECD B', 'ECD B'),
        ('Grade 1', 'Grade 1'),
        ('Grade 2', 'Grade 2'),
        ('Grade 3', 'Grade 3'),
        ('Grade 4', 'Grade 4'),
        ('Grade 5', 'Grade 5'),
        ('Grade 6', 'Grade 6'),
        ('Grade 7', 'Grade 7'),
    ])
    Address = models.CharField(max_length=100)


class JobApplications(models.Model):
    class Meta:
        db_table = 'staff_job_application'

    Name = models.CharField(max_length=50)
    Surname = models.CharField(max_length=50)
    Gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female')])
    pPosition = models.CharField(max_length=50)
    DOB = models.DateField(verbose_name="Date of Birth")
    Marital_Status = models.CharField(max_length=20, choices=[('Single', 'Single'), ('Married', 'Married'), ('Divoced', 'Divoced')])
    Email = models.EmailField()


class StudentsEnrolments(models.Model):
    class Meta:
        db_table = 'students_enrolments'
        
    Name = models.CharField(max_length=50)
    Surname = models.CharField(max_length=50)
    Gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female')])
    DOB = models.DateField()
    Email = models.EmailField()
    Grade_Level = models.CharField(max_length=20, choices=[
        ('ECD A', 'ECD A'),
        ('ECD B', 'ECD B'),
        ('Grade 1', 'Grade 1'),
        ('Grade 2', 'Grade 2'),
        ('Grade 3', 'Grade 3'),
        ('Grade 4', 'Grade 4'),
        ('Grade 5', 'Grade 5'),
        ('Grade 6', 'Grade 6'),
        ('Grade 7', 'Grade 7'),
    ])
    Address = models.CharField(max_length=100)