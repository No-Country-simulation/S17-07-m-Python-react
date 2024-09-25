from django.urls import path
from .views import *

urlpatterns = [
    path('search/query', GetSongs.as_view(), name='search'),
    path('search/category/<str:category>/<int:element_id>', GetElementById.as_view(), name='get_element_by_id'),
    path('search/charts', GetCharts.as_view(), name='get_charts_with_limit'),
]