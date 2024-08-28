from django.urls import path
from .views import *

urlpatterns = [
    path('playlist/create', CreatePlaylist.as_view(), name='create_playlist'),
]