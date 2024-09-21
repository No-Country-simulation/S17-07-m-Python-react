import json
from django.contrib.auth import authenticate, login
from django.forms import BaseModelForm
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.edit import CreateView
from django.http import HttpResponse, JsonResponse
from users.utils.token import generate_jwt
from .models import Users

# Create your views here.

@method_decorator(csrf_exempt, name="dispatch")
class Register(CreateView):
    model = Users
    fields = ["username", "email", "password"]
    
    def form_valid(self, form):
        user = Users.objects.create_user(**form.cleaned_data)
        
        return JsonResponse({
            "username": user.username,
            "email": user.email
        }, status=201)
        
    
    def form_invalid(self, form: BaseModelForm) -> HttpResponse:
        return JsonResponse({'errors': form.errors}, status=400)
    
    
@method_decorator(csrf_exempt, name='dispatch')
class Login(View):

    def post(self, request):
        try:
            body = json.loads(request.body)
        except json.decoder.JSONDecodeError:
            return JsonResponse({'error': 'JSON required'}, status=400)
        username = body.get('username')
        password = body.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            token = generate_jwt(user)
            return JsonResponse({'token': token}, status=200)
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)