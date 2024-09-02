from django.db import models
from users.models import Users

# Create your models here.
class History(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    song_id = models.PositiveIntegerField()
    order  = models.PositiveSmallIntegerField()