from django.db import models
from django.contrib.auth.models import User

from django.db import models

class Post(models.Model):
    text = models.TextField()    
    date = models.DateTimeField(auto_now_add=True)