from django.urls import path
from . import views
from .views import *
from django.contrib import admin

urlpatterns = [
    path('/', admin.site.urls),
]