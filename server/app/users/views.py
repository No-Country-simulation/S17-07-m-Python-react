from django.forms import BaseModelForm
from django.shortcuts import render
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.edit import CreateView
from django.http import HttpResponse, JsonResponse
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
        return super().form_invalid(form)