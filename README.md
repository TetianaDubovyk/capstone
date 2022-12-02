# This wine blog 
Is a single page application
#### Video Demo:  <URL HERE>
## Table of Contents

* [Distinctiveness and Complexity: Why you believe your project satisfies the distinctiveness and complexity requirements, mentioned above.](#how-to-use-it)
* [What’s contained in each file you created](#how-does-it-work)
  * [How to run your application.](#compress)
* [Any other additional information the staff should know about your project.](#about-the-algorithm)
* [If you’ve added any Python packages that need to be installed in order to run your web application, be sure to add them to a requirements.txt file!](#design-of-the-project)

## Distinctiveness and Complexity

My project satisfies the distinctiveness and complexity requirements because we havent created this kind of application before in this course.
It is an online journal (diary website) that offers regularly updated content about wine.
It presents information in reverse chronological order and it’s written in an informal style. 
User can scroll through the site or use the menu items to choose the kind of wine one wants to read about. 
Also user can choose a filter to navigate throgh the site by selecting a region of the wine on the main page.
Clicking on the image card opens the page of a particular wine and it shows picture of the wine bottle, representing video and personal opinion of the owner of the blog about this wine.

To add a new wine to the site one should use Django default admin interface:

 ```
 python manage.py createsuperuser
```

The project have 3 models:
* Regions_and_flags
* Personal_rating
* Wine_card

After loggin in, you can create, edit, and delete objects stored in the database.

All 






## How to use it
The script requires the following parameters to be launched: 

 ```
 python text_file_compressor.py decompress FILE.bin FILE.txt
```