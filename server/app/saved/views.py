from django.core.exceptions import ValidationError
from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from users.utils.decorators import jwt_required
from .models import PlaylistSongs, PlaylistUser
import json

# Create your views here.
@method_decorator(csrf_exempt, name="dispatch")
class CreatePlaylist(View):
    
    @jwt_required
    def post(self, request, *args, **kwargs):    
        try:
            body = json.loads(request.body)
        except json.decoder.JSONDecodeError:
            return JsonResponse({'error': 'JSON required'}, status=400)

        name = body.get("name")
        
        playlist = PlaylistUser(user=request.user, name=name)
        
        try:
            playlist.full_clean()
            playlist.save()
        except ValidationError as e:
            return JsonResponse({'error': e.message_dict}, status=400)
        
        return JsonResponse({'status': 'success'}, status=201)
    
    
@method_decorator(csrf_exempt, name="dispatch")
class GetPlaylist(View):
    
    @jwt_required
    def get(self, request, *args, **kwargs):
        playlist_id = kwargs.get('playlist_id', None)
        
        if playlist_id:
            playlist = PlaylistUser.objects.filter(user=request.user, pk=playlist_id).first()
            if not playlist:
                return JsonResponse({'error': "playlist not found"}, status=404)
            playlist_data = {
                "name": playlist.name
            }
            return JsonResponse({'playlist': playlist_data}, status=200)
        
        playlists = PlaylistUser.objects.filter(user=request.user)
        playlists_data = []
        
        for playlist in playlists:
            playlists_data.append({
                "name": playlist.name
            })
        
        return JsonResponse({'playlists': playlists_data}, status=200)
    
    
@method_decorator(csrf_exempt, name="dispatch")
class UpdatePlaylistProperties(View):
    
    @jwt_required
    def patch(self, request, *args, **kwargs):
        playlist_id = kwargs.get('playlist_id', None)
        
        # Gets the playlist
        playlist = PlaylistUser.objects.filter(user=request.user, pk=playlist_id).first()
        if not playlist:
            return JsonResponse({'error': "playlist not found"}, status=404)
        
        # Checks if there is a json
        try:
            body = json.loads(request.body)
        except json.decoder.JSONDecodeError:
            return JsonResponse({'error': 'JSON required'}, status=400)
        
        # Applies the changes
        if name := body.get("name"):
            playlist.name = name
            
        # Saves the changes
        try:
            playlist.full_clean()
            playlist.save()
        except ValidationError as e:
            return JsonResponse({'error': e.message_dict}, status=400)
        
        # Formats the data to return
        playlists_data = {
            "name": playlist.name,
            "id": playlist.pk
        }
        
        return JsonResponse({'status': 'succes',"playlist":playlists_data}, status=200)
        