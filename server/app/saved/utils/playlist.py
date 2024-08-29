from saved.models import PlaylistUser, PlaylistSongs, Favorite

def generate_info_dict(playlist: PlaylistUser) -> dict:
    songs = PlaylistSongs.objects.filter(playlist=playlist).order_by('order')
    favorites = set(Favorite.objects.filter(user=playlist.user).values_list('element_id', flat=True))
    songs_data = []
    for song in songs:
        songs_data.append({
            "id":song.song_id,
            "favorite":song.song_id in favorites
        })
    playlist_data = {
        "name": playlist.name,
        "songs amount": playlist.song_count,
        "id": playlist.pk,
        "songs": songs_data
    }
    return playlist_data