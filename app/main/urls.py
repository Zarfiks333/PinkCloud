from django.contrib import admin
from django.urls import include, path
from main.views import  *

app_name ='main'

urlpatterns = [
    path('', index, name='index'),
    path('wiki/', wiki, name='wiki'),
    path('map/', map, name='map'),
]