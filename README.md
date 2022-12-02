# This is a wine blog 
It is a single page application, which one can use as a tamplate for a blog about wine
#### Video Demo:  <URL HERE>
## Table of Contents

* [Distinctiveness and Complexity](#distinctiveness-and-complexity)
* [What’s contained in each file](#what’s-contained-in-each-file)
    * [views.py]
    * [models.py]
    * [index.html]
    * [wine_blog.js]
    * [Csv files](#csv-files)
    * [media](#media)
    * [Additional commands](#additional-commands)
* [How to run the application](#how-to-run-the-application)
* [Any other additional information the staff should know about your project.](#about-the-algorithm)
* [If you’ve added any Python packages -- a requirements.txt file!](#design-of-the-project) 
tqdm???

## Distinctiveness and Complexity

The wine blog is an online journal (diary website) that offers regularly updated content about wine.
It presents information in reverse chronological order and it is written in an informal style.

After site is loaded, user can see the menu bar, filter form, wine cards and a footer.
Navigation buttons at the end of a page appear when site have more then 6 wines to show.

Users can use the menu bar, which is available at all pages, to choose the kind of a wine they want to read about: red, white, sparkling, rose or choose a random wine option to show a random wine card.
By selecting a country and/or continent on the form at the main page users can filter which wines are currently showing.
If user select France for exemple, continent automaticly will change for Europe.

Click on a wine card opens the page (with JavaScript used to control the user interface) of a particular wine and it shows information about wine, a picture of the wine bottle, a representing video, a short personal comment and a personal chart(by icons) from the owner.If there is more wines of this region in the database, associated wines will appear in the corresponding block. If the are more then 3 of them, they will be hided away by an animated chevron.

## What’s contained in each file
 ### views.py
 In the views.py file almoust all functions renders the mail/inbox.html template.
 single_wine_content function - 
 associated_wines - , 
 get_countries_names - 


## How to run the application
To add a new wine to the site one should use Django default admin interface.
After loggin in, a site administrator can create, edit, and delete objects stored in the database.

```
 python manage.py createsuperuser
```

The project have 3 models:
* Regions_and_flags
* Personal_rating
* Wine_card