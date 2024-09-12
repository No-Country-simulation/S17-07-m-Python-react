from django.urls import path
from .views import *

urlpatterns = [
    path('search/related/<int:track_id>', GetRelatedSong.as_view(), name='related'),
]