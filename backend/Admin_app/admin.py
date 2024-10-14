from django.contrib import admin
from .models import User
from .serializer import UserSerializer

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'first_name', 'last_name', 'role', 'verified']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    list_filter = ['role', 'verified']

admin.site.register(User, UserAdmin)