from saved.models import PlaylistUser, PlaylistSongs

def generate_info_dict(playlist: PlaylistUser) -> dict:
    songs = PlaylistSongs.objects.filter(playlist=playlist).order_by('order')
    songs_data = []
    for song in songs:
        songs_data.append(song.song_id)
    playlist_data = {
        "name": playlist.name,
        "songs": playlist.song_count,
        "id": playlist.pk,
        "songs": songs_data
    }
    return playlist_data