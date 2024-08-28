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