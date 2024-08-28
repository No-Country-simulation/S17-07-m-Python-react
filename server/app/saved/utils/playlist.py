from saved.models import PlaylistUser

def generate_info_dict(playlist: PlaylistUser) -> dict:
    playlist_data = {
        "name": playlist.name,
        "id": playlist.pk
    }
    return playlist_data