from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from django.shortcuts import render
from itertools import chain
from django.core.paginator import Paginator
import random

from .models import Wine_card, Personal_rating, Regions_and_flags 


def index(request):
    
    wine_cards = Wine_card.objects.all().order_by('-price')
    
    # Get all available countries
    countries_ids = Wine_card.objects.values_list("country", flat=True).distinct()
    countries = get_countries_names(countries_ids)
    
    # Show 6 cards per page
    paginator = Paginator(wine_cards, 6)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    return render(request, "wine_blog/index.html", {
        "wine_cards": page_obj,
        "countries": countries,
        "continents": Wine_card.objects.values_list("continent", flat=True).distinct(),
        "img_for_menu_item": "/static/wine_blog/media/all_wines.png"
    })
    

# Filter continents
def continents(request):
    # Get selected continent
    selected_continent = request.GET.get("continent")
    continents = Wine_card.objects.values_list("continent", flat=True).exclude(continent = selected_continent).distinct()
    countries_ids = Wine_card.objects.values_list("country", flat=True).filter(continent = selected_continent).distinct()
    wine_cards = Wine_card.objects.filter(continent = selected_continent).order_by('id')
    
    if selected_continent == "All":
        continents = Wine_card.objects.values_list("continent", flat=True).distinct()
        countries_ids = Wine_card.objects.values_list("country", flat=True).distinct().exclude(continent = selected_continent)
        wine_cards = Wine_card.objects.all().order_by('id')
        
    # Get all available countries
    countries = get_countries_names(countries_ids)
        
    # Show 6 cards per page
    paginator = Paginator(wine_cards, 6) 
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    return render(request, "wine_blog/index.html", {
        "selected_continent": selected_continent,
        "continents": continents,
        "wine_cards": page_obj,
        "countries": countries,
    })
    

# Filter countries
def countries(request):
    
    # Get selected country and continent
    selected_country = request.GET.get("country")
    sel_country_id = Regions_and_flags.objects.get(country = selected_country)
    selected_continent = request.GET.get("continent")
    wine_cards = Wine_card.objects.filter(country = sel_country_id).order_by('id')
    
    if selected_country != "All":
        sel_continent = Wine_card.objects.values_list("continent", flat=True).filter(country = sel_country_id)[0]
        countries_ids = Wine_card.objects.values_list("country", flat=True).distinct().exclude(country = sel_country_id).filter(continent = sel_continent)
    elif selected_country == "All":
        sel_continent = selected_continent
        countries_ids = Wine_card.objects.values_list("country", flat=True).distinct().exclude(country = sel_country_id).filter(continent = sel_continent)
        wine_cards = Wine_card.objects.filter(continent = selected_continent).order_by('id')
        
    # Get all available countries
    countries = get_countries_names(countries_ids)
    
    # Show 6 cards per page
    paginator = Paginator(wine_cards, 6) 
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
        
    return render(request, "wine_blog/index.html", {
        "selected_country": selected_country,
        "selected_continent": sel_continent,
        "continents": Wine_card.objects.values_list("continent", flat=True).distinct().exclude(continent = sel_continent),
        "wine_cards": page_obj,
        "countries": countries,
    })


# Filter by wine type
def types(request):
    # Get the type
    selected_type = request.GET.get("wine_type")
    message = ""
    
    if selected_type == "Random wine":
        # Generating a random number
        wine_cards = Wine_card.objects.all()
        if len(wine_cards) > 0:
            random_num = random.randint(1, len(wine_cards))
            img = "/static/wine_blog/media/random_menu.png"
            # Get single random object
            wine_cards = Wine_card.objects.filter(id = random_num)
        else:
            img = "/static/wine_blog/media/random_menu.png"
            message = "No wines found"
    else:
        # Find all wines of selected type
        wine_cards = Wine_card.objects.filter(type__startswith=selected_type).order_by('id')
        if len(wine_cards) == 0:
           message = "No wines found"
        if selected_type == "Red":
            img = "/static/wine_blog/media/red_menu.png"
        elif selected_type == "White":
            img = "/static/wine_blog/media/white_menu.png"
        elif selected_type == "Sparkling":
            img = "/static/wine_blog/media/sparkling_menu.png"
        elif selected_type == "Rose":
            img = "/static/wine_blog/media/rose_menu.png"
    
    continents = Wine_card.objects.values_list("continent", flat=True).distinct()
    countries_ids = Wine_card.objects.values_list("country", flat=True).distinct()
    
    # Get all available countries
    countries = get_countries_names(countries_ids)
    
    # Show 6 cards per page
    paginator = Paginator(wine_cards, 6)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    return render(request, "wine_blog/index.html", {
        "selected_type": selected_type,
        "img_for_menu_item": img,
        "message": message,
        "continents": continents,
        "wine_cards": page_obj,
        "countries": countries,
    })
    

def single_wine_content(request):
    wine_id = request.GET.get("wine_id")
    card = Wine_card.objects.filter(id = wine_id)
    
    # Get the value of a particular column of the card QuerySet
    id_rating = list(card.values_list("rating_id", flat=True))
    
    rating = Personal_rating.objects.filter(id = id_rating[0])
    country = Regions_and_flags.objects.filter(id = card[0].country_id)
    
    # Use the chain() method to combine QuerySets from models
    all_fields_from_two_tables = list(chain(card, rating, country))
    
    card_json = serializers.serialize('json', all_fields_from_two_tables)
    return HttpResponse(card_json, content_type='application/json')


def associated_wines(request):
    country = request.GET.get("country")
    id = request.GET.get("id")
    cards = Wine_card.objects.filter(country = country).exclude(id = id)
    cards_json = serializers.serialize('json', cards)

    return HttpResponse(cards_json, content_type='application/json')


def get_countries_names(ids):
    names = []
    
    for i in ids:
        name = Regions_and_flags.objects.get(id = i)
        names.append(name)
    return(names)