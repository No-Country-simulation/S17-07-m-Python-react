from django.urls import path
from .views import *

urlpatterns = [
    path('playlist/create', CreatePlaylist.as_view(), name='create_playlist'),
    path('playlist/get/', GetPlaylist.as_view(), name='create_playlist'),
    path('playlist/get/<int:playlist_id>', GetPlaylist.as_view(), name='create_playlist'),
]