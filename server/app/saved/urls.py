from django.urls import path
from .views import *

urlpatterns = [
    path('playlist/create', CreatePlaylist.as_view(), name='create_playlist'),
    path('playlist/get/', GetPlaylist.as_view(), name='get_playlists'),
    path('playlist/get/<int:playlist_id>', GetPlaylist.as_view(), name='get_playlist_by_id'),
    path('playlist/update/<int:playlist_id>', UpdatePlaylistProperties.as_view(), name='update_playlist'),
]