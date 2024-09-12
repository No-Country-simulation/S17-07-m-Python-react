import requests
from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from users.utils.decorators import jwt_required
from saved.models import Favorite

# Create your views here.
@method_decorator(csrf_exempt, name="dispatch")
class GetRelatedSong(View):

    @jwt_required
    def get(self, request, *args, **kwargs):
        track_id = kwargs.get('track_id', None)
        
        if not track_id:
            return JsonResponse({"error":"track_id required"}, status=400)
            

        url = f'https://api.deezer.com/track/{track_id}'

        response = requests.get(url)
        if response.status_code != 200:
            raise JsonResponse(status=response.status_code)

        data = response.json()
        if 'error' in data:
            return JsonResponse({"error":data['error']['message']}, status=400)
        
        artist_id = data['artist']['id']
        
        similar_artists_url = f"https://api.deezer.com/artist/{artist_id}/related"
        similar_artists_response = requests.get(similar_artists_url)
        
        if similar_artists_response.status_code != 200:
            raise JsonResponse(status=similar_artists_response.status_code)
        
        similar_artists_data = similar_artists_response.json()['data']

        if len(similar_artists_data) > 3:
            similar_artists_data = similar_artists_data[:3]

        similar_songs = []
        for artist in similar_artists_data:
            
            artist_tracks_url = f"https://api.deezer.com/artist/{artist['id']}/top?limit={3}"
            artist_tracks_response = requests.get(artist_tracks_url)
            
            if artist_tracks_response.status_code == 200:
                artist_tracks = artist_tracks_response.json()['data']
                for track in artist_tracks:
                    track["favorite"] = Favorite.objects.filter(user=request.user, element_id=track["id"]).exists()
                similar_songs.append(artist_tracks)

        return JsonResponse({"similar_songs": similar_songs}, status=200)
        