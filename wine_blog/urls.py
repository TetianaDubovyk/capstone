
from django.urls import path

from . import views


urlpatterns = [
    path("", views.index, name="index"),
    path("continents", views.continents, name="continents"),
    path("countries", views.countries, name="countries"),
    path("types", views.types, name="types"),
    path("single_wine_content", views.single_wine_content, name="single_wine_content"),
    path("associated_wines", views.associated_wines, name="associated_wines"),
]