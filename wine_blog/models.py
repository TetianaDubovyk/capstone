from django.db import models
from django.core.validators import MaxValueValidator

# Create your models here.

CONTINENTS = (
    ('Africa', 'Africa'),
    ('North America', 'North America'),
    ('South America', 'South America'),
    ('Asia', 'Asia'),
    ('Europe', 'Europe'),
    ('Oceania', 'Oceania'),
)
    
GRAPES = (
    ('Cabernet Sauvignon', 'Cabernet Sauvignon'),
    ('Chardonnay', 'Chardonnay'),
    ('Grenache', 'Grenache'),
    ('Malbec', 'Malbec'),
    ('Merlot', 'Merlot'),
    ('Pinot Noir', 'Pino Noir'),
    ('Riesling', 'Riesling'),
    ('Sauvignon Blanc', 'Sauvignon Blanc'),
    ('Shiraz/Syrah', 'Shiraz/Syrah'),
)
    
TYPES_OF_WINE = (
    ('Red Dry', 'Red Dry'),
    ('Red Semi Sweet', 'Red Semi Sweet'),
    ('Red Sweet', 'Red Sweet'),
    ('White Dry', 'White Dry'),
    ('White Semi Sweet', 'White Semi Sweet'),
    ('White Sweet', 'White Sweet'),
    ('Sparkling', 'Sparkling'),
    ('Rose', 'Rose'),
)


class Regions_and_flags(models.Model):
    code = models.CharField(max_length=3, blank=True, default='fr')
    country = models.CharField(max_length=150, blank=True, default='France')
    continent = models.CharField(max_length=100, blank=True, default='Europe')
    
    def __str__(self):
        return f"{self.country}"
     
        
class Personal_rating(models.Model):
    tannin = models.PositiveSmallIntegerField(default=0, validators=[MaxValueValidator(5)])
    sweetness = models.PositiveSmallIntegerField(default=0, validators=[MaxValueValidator(5)])
    acidity = models.PositiveSmallIntegerField(default=0, validators=[MaxValueValidator(5)])
    alcohol = models.PositiveSmallIntegerField(default=0, validators=[MaxValueValidator(5)])
    body = models.PositiveSmallIntegerField(default=0, validators=[MaxValueValidator(5)])
    recommend = models.BooleanField(default=True)
    
    def __str__(self):
        return f"Recommend: {self.recommend}"
    
    
class Wine_card(models.Model):
    grapes_list = models.CharField(max_length=20, choices=GRAPES, default='Cabernet Sauvignon', blank=True)
    winery_name = models.CharField(max_length=100, blank=True)
    special_grapes = models.CharField(max_length=100, blank=True)
    continent = models.CharField(max_length=15, choices=CONTINENTS, default='Europe')
    country = models.ForeignKey(Regions_and_flags, on_delete=models.CASCADE, null=True, blank=True)
    type = models.CharField(max_length=30, choices=TYPES_OF_WINE, default='Red Dry')
    price = models.IntegerField(default=0)
    year = models.IntegerField(default=0)
    description = models.TextField(blank=True)
    rating_id = models.ForeignKey(Personal_rating, on_delete=models.CASCADE, related_name="rating_id", null=True, blank=True)
    image_url = models.CharField(max_length=300, blank=True)
    video_url = models.CharField(max_length=300, blank=True)
    post_created_date = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.country.country}"