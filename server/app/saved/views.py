from django.core.exceptions import ValidationError
from django.db.models import Case, When, Value, CharField
from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from users.utils.decorators import jwt_required
from .utils.playlist import generate_info_dict
from .models import PlaylistSongs, PlaylistUser, Favorite
import json

# Create your views here.
## Playlists
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
            
            return JsonResponse({'playlist': generate_info_dict(playlist)}, status=200)
        
        playlists = PlaylistUser.objects.filter(user=request.user)
        playlists_data = []
        
        for playlist in playlists:
            playlists_data.append(generate_info_dict(playlist))
        
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
        
        
        return JsonResponse({'status': 'succes',"playlist":generate_info_dict(playlist)}, status=200)
    
    
    @jwt_required
    def put(self, request, *args, **kwargs):
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
        
        # Checks missing fields
        required_fields = ['name']
        missing_fields = [field for field in required_fields if field not in body]
        
        if missing_fields:
            return JsonResponse({'error': f'Missing fields: {", ".join(missing_fields)}'}, status=400)
        
        # Applies the changes
        for field in required_fields:
            setattr(playlist, field, body.get(field))
            
        # Saves the changes
        try:
            playlist.full_clean()
            playlist.save()
        except ValidationError as e:
            return JsonResponse({'error': e.message_dict}, status=400)
        
        
        return JsonResponse({'status': 'succes',"playlist":generate_info_dict(playlist)}, status=200)
    
    
@method_decorator(csrf_exempt, name="dispatch")
class DeletePlaylist(View):
    
    @jwt_required
    def delete(self, request, *args, **kwargs):
        playlist_id = kwargs.get('playlist_id', None)
        
        # Gets the playlist
        playlist = PlaylistUser.objects.filter(user=request.user, pk=playlist_id).first()
        if not playlist:
            return JsonResponse({'error': "playlist not found"}, status=404)
        
        # Deletes the playlist
        playlist.delete()
        
        return JsonResponse({'status': 'succes'}, status=200)
    
    
@method_decorator(csrf_exempt, name="dispatch")
class AddSong(View):
    @jwt_required
    def post(self, request, *args, **kwargs):
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
        
        # Gets the songs
        if not (songs := body.get("songs")):
            return JsonResponse({'error': 'songs required'}, status=400)
        
        # Adds the songs
        for song in songs:
            new_song = PlaylistSongs(playlist=playlist, song_id=song, order=playlist.song_count + 1)
            try:
                new_song.full_clean()
                new_song.save()
                playlist.song_count += 1
            except ValidationError as e:
                playlist.save()
                return JsonResponse({'error': e.message_dict}, status=400)
            
        playlist.save()
        
        return JsonResponse({'status': 'succes'}, status=200)
        
     
@method_decorator(csrf_exempt, name="dispatch")   
class UpdatePlaylistSongs(View):
    @jwt_required
    def put(self, request, *args, **kwargs):
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
        
        # Gets the songs
        songs = body.get("songs")
        if songs == None:
            return JsonResponse({'error': 'songs required'}, status=400)
        if type(songs) != list:
            return JsonResponse({'error': 'songs must be an array'}, status=400)
        
        # Resets the songs
        playlist.song_count = 0
        PlaylistSongs.objects.filter(playlist=playlist).delete()
        
        # Adds the songs
        for song in songs:
            new_song = PlaylistSongs(playlist=playlist, song_id=song, order=playlist.song_count + 1)
            try:
                new_song.full_clean()
                new_song.save()
                playlist.song_count += 1
            except ValidationError as e:
                playlist.save()
                return JsonResponse({'error': e.message_dict}, status=400)
            
        playlist.save()
        
        return JsonResponse({'status': 'succes'}, status=200)
    
# ----------------------------------------------------------------------------------------------------
## Favourites

@method_decorator(csrf_exempt, name="dispatch")
class GetFavorites(View):
    categories = {
        "song":1,
        "album":2,
        "singer":3
    }
    
    @jwt_required
    def get(self, request, *args, **kwargs):
        category = kwargs.get('category', None)
        
        if category:
            if category not in self.categories:
                return JsonResponse({'error': f"category {category} not found"}, status=404)
            
            favorites_queryset = Favorite.objects.filter(user=request.user, category=self.categories[category]).annotate(
                category_name=Case(
                    When(category=1, then=Value('song')),
                    When(category=2, then=Value('album')),
                    When(category=3, then=Value('singer')),
                    output_field=CharField(),
                )
            )
        elif not category:
            favorites_queryset = Favorite.objects.filter(user=request.user).annotate(
                category_name=Case(
                    When(category=1, then=Value('song')),
                    When(category=2, then=Value('album')),
                    When(category=3, then=Value('singer')),
                    output_field=CharField(),
                )
            )
            
        favorites = list(favorites_queryset.values())
            
        return JsonResponse({'favorites': favorites}, status=200)
    
    
@method_decorator(csrf_exempt, name="dispatch")
class AddFavorite(View):
    categories = {
        "song":1,
        "album":2,
        "singer":3
    }
    
    @jwt_required
    def post(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)
        except json.decoder.JSONDecodeError:
            return JsonResponse({'error': 'JSON required'}, status=400)

        category = body.get("category")
        element_id = body.get("element_id")
        

        if category not in self.categories:
            return JsonResponse({'error': f"category {category} not found"}, status=404)
        
        try:
            element_id = int(element_id)
        except ValueError:
            return JsonResponse({'error': 'element_id must be an int'}, status=400)
        except TypeError:
            return JsonResponse({'error': 'element_id required'}, status=400)
        
        favorites = set(Favorite.objects.filter(user=request.user).values_list('element_id', flat=True))
        if element_id in favorites:
            return JsonResponse({'error': 'element_id is already favorite'}, status=409)
        
        favorite = Favorite(category=self.categories[category], user=request.user, element_id=element_id)
        
        try:
            favorite.full_clean()
            favorite.save()
        except ValidationError as e:
            return JsonResponse({'error': e.message_dict}, status=400)
        
        return JsonResponse({'status': 'success'}, status=201)
    
    
@method_decorator(csrf_exempt, name="dispatch")
class DeleteFavorite(View):
    @jwt_required
    def delete(self, request, *args, **kwargs):
        favorite_id = kwargs.get('favorite_id', None)

        favorite = Favorite.objects.filter(user=request.user, pk=favorite_id).first()
        if not favorite:
            return JsonResponse({'error': "favorite not found"}, status=404)
        
        favorite.delete()
        
        return JsonResponse({'status': 'succes'}, status=200)
    
    
@method_decorator(csrf_exempt, name="dispatch")
class IsFavorite(View):
    @jwt_required
    def get(self, request, *args, **kwargs):
        element_id = kwargs.get('element_id', None)
        
        if Favorite.objects.filter(user=request.user, element_id=element_id).exists():
            return JsonResponse({'exists': True}, status=200)
        else:
            return JsonResponse({'exists': False}, status=200)
        