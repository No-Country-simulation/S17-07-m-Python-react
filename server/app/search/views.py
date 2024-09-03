import requests
from django.db.models import Case, When, Value, CharField
from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from users.utils.decorators import jwt_required
from django.http import JsonResponse
from saved.models import Favorite

# Create your views here.
@method_decorator(csrf_exempt, name="dispatch")
class GetSongs(View):

    @jwt_required
    def get(self, request, *args, **kwargs):
        query = request.GET.get('q', None)
        amount = request.GET.get('amount', 10)
        if not query:
            return JsonResponse({"error":"query required"}, status=400)

        url = f"https://api.deezer.com/search?q={query}&limit={amount}"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            if 'error' in data:
                return JsonResponse({"error":data['error']['message']}, status=400)
            if data['data']:
                for song in data["data"]:
                    song["favorite"] = Favorite.objects.filter(user=request.user, element_id=song["id"]).exists()
                return JsonResponse({
                    'data': data['data']
                }, status=200)
        return JsonResponse(status=400)
    
    
@method_decorator(csrf_exempt, name="dispatch")
class GetElementById(View):
    
    @jwt_required
    def get(self, request, *args, **kwargs):
        element_id = kwargs.get('element_id', None)
        category = kwargs.get('category', None)
        
        if not element_id:
            return JsonResponse({"error":"element_id required"}, status=400)
        if not category:
            return JsonResponse({"error":"category required"}, status=400)

        if category not in ("track", "album", "artist"):
            return JsonResponse({"error":"category not valid"}, status=400)
            

        url = f"https://api.deezer.com/{category}/{element_id}"
        print(url)
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            if 'error' in data:
                return JsonResponse({"error":data['error']['message']}, status=400)
            data["favorite"] = Favorite.objects.filter(user=request.user, element_id=data["id"]).exists()
            return JsonResponse({
                'data': data
            }, status=200)
        else:
            return JsonResponse(status=response.status_code)