from django.urls import path
from .views import *

urlpatterns = [
    path('history/add/', AddHistory.as_view(), name='add_history'),
]