import requests
from django.db.models import Case, When, Value, CharField
from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from users.utils.decorators import jwt_required
from django.http import JsonResponse

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
            if data['data']:
                # Retorna la primera canción encontrada
                return JsonResponse({
                    'title': data['data']
                })
        return JsonResponse(status=400)