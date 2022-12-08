from django.core.management.base import BaseCommand, CommandError
from wine_blog.models import Wine_card, Personal_rating, Regions_and_flags
import csv
from tqdm import tqdm



class Command(BaseCommand):
    help = 'From csv files insert data into Django models'
    
    def handle(self, *args, **kwargs):
        try:
            # Relative path to the 'regions_and_flags.csv' file 
            regions_path = "wine_blog\\static\\wine_blog\\csv\\regions_and_flags.csv"
            # Relative path to the 'rating.csv' file       
            rating_path = "wine_blog\\static\\wine_blog\\csv\\rating.csv"
            # Relative path to the 'cards.csv' file 
            cards_path = "wine_blog\\static\\wine_blog\\csv\\cards.csv"
            
            path_list = [regions_path, rating_path, cards_path]
            flist = [open_regions, open_ratings, open_cards]
            
            self.stdout.write(">>>>>>>>>>>>>>>>>>>>>>")
            self.stdout.write("Please wait until Django models will be filled in with pre-written data (approximately 30sec)")
            
            # Show a progress bar of the filling process 
            for f in tqdm(range(len(flist))):
                flist[f](path_list[f])
    
            self.stdout.write("Data has been successufully filled into the Django models")
            self.stdout.write(">>>>>>>>>>>>>>>>>>>>>>")
            
        except:
            raise CommandError('Insertion failed.')

       
def open_regions(regions_path):
    with open(regions_path, 'r') as file:
                reader = csv.reader(file)
                next(reader)
                
                # Insert data into the table
                for row in reader:
                    flag = Regions_and_flags(code=row[0], country=row[1], continent=row[2])
                    flag.save()
                    
                    
def open_ratings(rating_path):
    with open(rating_path, 'r') as file:
                reader = csv.reader(file)
                next(reader)
                
                # Insert data into the table
                for row in reader:
                    rating = Personal_rating(tannin=row[1], 
                                            sweetness=row[2], 
                                            acidity=row[3], 
                                            alcohol=row[4], 
                                            body=row[5], 
                                            recommend=row[6])
                    rating.save()
                                     
                    
def open_cards(cards_path):
     with open(cards_path, 'r') as file:
                
                reader = csv.reader(file)
                next(reader)
                
                # Insert the data into the table
                for row in reader:
                    card = Wine_card(grapes_list=row[1], 
                                    winery_name=row[2], 
                                    special_grapes=row[3], 
                                    type=row[4],
                                    price=row[5], 
                                    year=row[6], 
                                    description=row[7], 
                                    image_url=row[8], 
                                    post_created_date=row[9], 
                                    continent=row[10], 
                                    country=Regions_and_flags.objects.get(id=int(row[11])), 
                                    rating_id=Personal_rating.objects.get(id=int(row[12])), 
                                    video_url=row[13])
                    card.save()