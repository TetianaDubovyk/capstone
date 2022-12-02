from django.contrib import admin
from .models import Wine_card, Personal_rating, Regions_and_flags

# Register your models here.
admin.site.register(Wine_card)
admin.site.register(Personal_rating)
admin.site.register(Regions_and_flags)