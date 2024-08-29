from django.urls import path
from .views import *

urlpatterns = [
    #playlist
    path('playlist/create', CreatePlaylist.as_view(), name='create_playlist'),
    path('playlist/get/', GetPlaylist.as_view(), name='get_playlists'),
    path('playlist/get/<int:playlist_id>', GetPlaylist.as_view(), name='get_playlist_by_id'),
    path('playlist/update/<int:playlist_id>', UpdatePlaylistProperties.as_view(), name='update_playlist'),
    path('playlist/delete/<int:playlist_id>', DeletePlaylist.as_view(), name='delete_playlist'),
    path('playlist/add/<int:playlist_id>', AddSong.as_view(), name='add_song_to_playlist'),
    path('playlist/change/<int:playlist_id>', UpdatePlaylistSongs.as_view(), name='change_songs_playlist'),
    # favorites
    path('favorite/get/', GetFavorites.as_view(), name='get_favorites'),
    path('favorite/get/<str:category>', GetFavorites.as_view(), name='get_favorites_by_category'),
]