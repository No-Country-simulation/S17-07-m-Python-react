from django.core.exceptions import ValidationError
from django.db.models import F
from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from users.utils.decorators import jwt_required
from .models import History
import json

# Create your views here.
@method_decorator(csrf_exempt, name="dispatch")
class HistoryView(View):
    
    @jwt_required
    def post(self, request, *args, **kwargs):
        # Checks if there is a JSON
        try:
            body = json.loads(request.body)
        except json.decoder.JSONDecodeError:
            return JsonResponse({'error': 'JSON required'}, status=400)
        
        # Gets the song
        if not (song := body.get("song")):
            return JsonResponse({'error': 'song required'}, status=400)
        
        # Converts song to int
        try:
            song = int(song)
        except ValueError:
            return JsonResponse({'error': 'song must be an int'}, status=400)
        
        # Adds the song
        song_history = History(user=request.user, song_id=song, order=1)
        
        # Saves the song and updates the history
        try:
            song_history.full_clean()
            History.objects.filter(user=request.user).update(order=F('order') + 1)
            History.objects.filter(order__gt=10).delete()
            song_history.save()
        except ValidationError as e:
            return JsonResponse({'error': e.message_dict}, status=400)
        
        # response
        return JsonResponse({'status': 'succes'}, status=200)
    
    
    @jwt_required
    def get(self, request, *args, **kwargs):
        # Get the songs
        songs = History.objects.filter(user=request.user).order_by('order')
        
        # Convert it to a list
        songs = list(songs.values())
        
        # Returns it
        return JsonResponse({'history': songs}, status=200)