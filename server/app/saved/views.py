from django.shortcuts import render
from django.views import View
from django.http import JsonResponse
import json

# Create your views here.
class CreatePlaylist(View):
    
    def post(self, request):
        return JsonResponse({'error': ''}, status=400)