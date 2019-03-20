from django.contrib import admin

from .models import Prep, PrepTeam, PrepSocial, News

admin.site.register(Prep)
admin.site.register(PrepTeam)
admin.site.register(PrepSocial)
admin.site.register(News)