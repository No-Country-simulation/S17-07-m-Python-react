from django.urls import path
from .views import *

urlpatterns = [
    path('history/add/', HistoryView.as_view(), name='add_history'),
]