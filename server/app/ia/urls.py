from django.urls import path
from .views import buscar_canciones_deezer

urlpatterns = [
    path('buscar-canciones-deezer/', buscar_canciones_deezer.as_view(), name='buscar_canciones_deezer'),
]
