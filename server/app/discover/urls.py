from django.urls import path
from .views import *

urlpatterns = [
    path('discover/', DiscoverSongs.as_view(), name='discover'),
]