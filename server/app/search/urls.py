from django.urls import path
from .views import *

urlpatterns = [
    path('search/query', GetSongs.as_view(), name='search'),
]