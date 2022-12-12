# This is a wine blog 
It is a single page application, which one can use as a template for a blog about wine.
#### Video Demo:  <https://youtu.be/MQu1b46aGVE>
## Table of Contents
* [Distinctiveness and Complexity](#distinctiveness-and-complexity)
* [Short describing of the project](#short-describing-of-the-project)
* [What is contained in each file](#what-is-contained-in-each-file)
* [How to run the application](#how-to-run-the-application)
* [Additional information](#additional-information)

## Distinctiveness and Complexity
My project is distinct from the other ones in this course because it covers the topic of a blog site (or a news site in a way), 
which is owned by an individual and *the information is the focus*, not the communication with the viewer. 
Also it has objects for user to interact with, such as an animated menu bar, a filter form at the main page and the chevrons on the single wine page. 

## Short describing of the project
The wine blog is an online journal (a diary website) that offers regularly updated content about wine. 
It presents information in reverse chronological order and it is written in an informal style.

After site is loaded, user can see the menu bar, filter form, wine cards and a footer.
Navigation buttons at the end of a page appears when site has more than 6 wines to show. All site logos are clickable and returns a user to the main page.

Users can use the menu bar, which is available at all pages, to choose the kind of a wine they want to read about: red, white, sparkling or rose, 
or choose the “random wine” option to show a random wine card.
By selecting a country and/or continent on the form at the main page, users can filter which wines are currently showing on. 
If the user selects France for example, continent field will automatically get changed for Europe.

A click on a wine card opens the page of a particular wine and it shows the information about this wine, 
a picture of the wine bottle, a representing video, a short personal comment, owner’s personal chart (by icons) and a short recommendation. 
If there are more wines of this region in the database, associated wines will appear in the corresponding block. 
If there are more than 3 of them, they will be hidden away with an animated chevron.

## What is contained in each file
### views.py
- **index function**: renders the wine_blog/index.html with all available wine cards, ordered by price
- *continents function*: gets the selected continent from the form, filters available countries of the continent and renders the index.html with those countries and their corresponding wine cards
- **countries function**: gets the selected country, renders the index page; continent field gets automatically changed to corresponding continent, based on the chosen country
- **types function**: renders the index.html with wine cards of a particular wine type which was chosen by the user from the menu items; if user choose a "random wine" item,
it will render only one random wine card; message "no wines found" returns if there are no wines of chosen type
- **single_wine_content function**: returns JSON data from the server (in the body of an HTTP response) with the data from the all fields from 2 database tables (ratings and description) of a chosen wine; 
- **associated_wines function**: gets the id of the current wine (to exclude it from the result) and a country of the current wine, and returns the JSON data with associated wines, filtered by country
- **get_countries_names function**: helper function to get all currently available countries from a database (by their ids)

### models.py
The models.py file consists of 3 models: 
Regions_and_flags (model for countries), 
Personal_rating (model to store a rating of each wine based on wine scale traits), 
Wine_card (model to store the data of each wine) 
and 3 constants: CONTINENTS, GRAPES (most popular grapes), TYPES_OF_WINE (red, dry, etc.).

### index.html
There are three main sections in the body of the page:
- **navbar section**: the logo of the site and the menu 
- **single wine section**: a section which gets visible only to show a single wine content on the page
- **content section**: contains the form to select region of the wine, the wine cards tiles, the pagination section and a footer

### wine_blog.js
After the DOM content of the page has been loaded, event listeners got attached to the select forms, to the menu items and to each of the wine cards.

When the menu item is clicked, for example, a GET request has been send to `/types` route with the query string of chosen item as a parameter, 
which will render the `index.html` with the wine cards of a particular wine type. 

When the wine card is clicked, we use the `fetch` function to get a response with all info of the chosen wine. 
Then the `show_wine` function get called, with the response from fetch function as a parameter. 
The `show_wine` function first hides the content section with all cards and shows the `single_wine` section. 
After that, the function takes all of the tags for a single wine and sets their values to the empty string to clear them out. 
Then, populates the tags with current wines data, shows header image based on the type of the wine, creates a media tag, a video tag, 
creates the divs with the ratings icons, and make a call to the `get_associated_wines` function to find all the associated wines. 
Which will use the `fetch` function to get all the wines from the database, filtered by the country of the current wine. Then it will call `render_associated_cards` function. 
The arguments to the `render_associated_cards` function is the response from the fetch function (wine cards) and the country name. 
It will create a carousel container at the bottom of the page with the associated wine cards. 
If the amount of the associated cards is higher than 3 items, it will create an animated chevron-down icon to hide them away. 
Clicking on the chevron will expand the container to show all the available cards and the chevron-down icon will be replaced with chevron-up icon, 
which when clicked, will collapse the container back to 3 items. 
Click on the wine from the carousel will open a single wine page for the chosen wine.

### style.css
Contains design for the site.

### Media folder
Contains all the images for the site

### CSV folder
The folder contains three csv files: cards.csv, ratings.csv and regions_and_flags.csv. 
Cards.csv contains pre-written data for the Wine_card model.
Ratings.csv contains corresponding ratings to wines from cards.csv for the Ratings model.
Regions_and_flags contain all the countries in the world with their flag codes.

### fill_in_database.py
In the file has been implemented the custom django-admin command to add an additional manage.py action to the application. 
The command is intended to populate the application database with the pre-written data, to display purposes.
The `handle` method runs the functions (`open_regions`, `open_ratings`, `open_cards`) to open the csv files and insert the data from them into the Django database tables. 
Each function is called with the parameter - the path of the corresponding csv file.
It takes approximately 30sec to fill in the database, during which user can see the progress bar of the process.

## How to run the application
To run the application for a first time, execute:
```
python manage.py makemigrations wine_blog
``` 
Then apply migrations to the database:
```
python manage.py migrate
```
To populate the site with some of the samples data, execute: 
```
python manage.py fill_in_database
```
To start the server, run:
```
python manage.py runserver
```
To add new data to the site, use Django default admin interface. So, first create an admin user:
```
python manage.py createsuperuser
```
Enter a username, an email and a password. Then run:
```
python manage.py runserver
```
Go to the local_domain/admin/, log in with the superuser account which was created in the previous step.
After logging in, a site administrator can create, edit, and delete objects stored in the database.

## Additional information
The **tqdm** package needs to be installed:
```
pip install -r requirements.txt
```
The package is used to show the progress bar of the process of inserting the data into a database, after running the `fill_in_database` command.

All the media files for the wine cards belongs to me personally.