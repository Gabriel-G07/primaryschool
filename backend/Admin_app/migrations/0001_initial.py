# Generated by Django 3.2.13 on 2024-10-04 19:05

import Admin_app.models
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='JobApplications',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=50)),
                ('Surname', models.CharField(max_length=50)),
                ('Gender', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female')], max_length=10)),
                ('pPosition', models.CharField(max_length=50)),
                ('DOB', models.DateField(verbose_name='Date of Birth')),
                ('Marital_Status', models.CharField(choices=[('Single', 'Single'), ('Married', 'Married'), ('Divoced', 'Divoced')], max_length=20)),
                ('Email', models.EmailField(max_length=254)),
            ],
            options={
                'db_table': 'staff_job_application',
            },
        ),
        migrations.CreateModel(
            name='Staff',
            fields=[
                ('Username', models.CharField(max_length=50, unique=True)),
                ('Name', models.CharField(max_length=50)),
                ('Surname', models.CharField(max_length=50)),
                ('Gender', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female')], max_length=10)),
                ('Position', models.CharField(max_length=50)),
                ('DOB', models.DateField(verbose_name='Date of Birth')),
                ('Marital_Status', models.CharField(choices=[('Single', 'Single'), ('Married', 'Married'), ('Divoced', 'Divoced')], max_length=20)),
                ('Email', models.EmailField(max_length=254, primary_key=True, serialize=False, unique=True)),
            ],
            options={
                'db_table': 'Staff',
            },
        ),
        migrations.CreateModel(
            name='Students',
            fields=[
                ('RegNumber', models.CharField(editable=False, max_length=8, primary_key=True, serialize=False, unique=True)),
                ('Name', models.CharField(max_length=50)),
                ('Surname', models.CharField(max_length=50)),
                ('Gender', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female')], max_length=10)),
                ('DOB', models.DateField()),
                ('Email', models.EmailField(max_length=254)),
                ('Grade_Level', models.CharField(choices=[('ECD A', 'ECD A'), ('ECD B', 'ECD B'), ('Grade 1', 'Grade 1'), ('Grade 2', 'Grade 2'), ('Grade 3', 'Grade 3'), ('Grade 4', 'Grade 4'), ('Grade 5', 'Grade 5'), ('Grade 6', 'Grade 6'), ('Grade 7', 'Grade 7')], max_length=20)),
                ('Address', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'Students',
            },
        ),
        migrations.CreateModel(
            name='StudentsEnrolments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=50)),
                ('Surname', models.CharField(max_length=50)),
                ('Gender', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female')], max_length=10)),
                ('DOB', models.DateField()),
                ('Email', models.EmailField(max_length=254)),
                ('Grade_Level', models.CharField(choices=[('ECD A', 'ECD A'), ('ECD B', 'ECD B'), ('Grade 1', 'Grade 1'), ('Grade 2', 'Grade 2'), ('Grade 3', 'Grade 3'), ('Grade 4', 'Grade 4'), ('Grade 5', 'Grade 5'), ('Grade 6', 'Grade 6'), ('Grade 7', 'Grade 7')], max_length=20)),
                ('Address', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'students_enrolments',
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('username', models.CharField(max_length=150, primary_key=True, serialize=False, unique=True)),
                ('first_name', models.CharField(max_length=150)),
                ('last_name', models.CharField(max_length=150)),
                ('role', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('is_online', models.BooleanField(default=False)),
                ('last_logout', models.DateTimeField(blank=True, null=True)),
                ('bio', models.TextField(blank=True, null=True)),
                ('settings', models.TextField(blank=True, null=True)),
                ('image', models.ImageField(blank=True, default='default.jpg', null=True, upload_to='user_images')),
                ('verified', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'db_table': 'auth_user',
                'auto_created': False,
            },
            managers=[
                ('objects', Admin_app.models.CustomUserManager()),
            ],
        ),
    ]
