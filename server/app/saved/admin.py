from django.contrib import admin
from .models import PlaylistUser, PlaylistSongs

# Register your models here.
admin.site.register(PlaylistSongs)
admin.site.register(PlaylistUser)