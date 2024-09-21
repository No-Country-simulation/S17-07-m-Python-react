from django.contrib import admin
from .models import PlaylistUser, PlaylistSongs, Favorite

# Register your models here.
admin.site.register(PlaylistSongs)
admin.site.register(PlaylistUser)
admin.site.register(Favorite)