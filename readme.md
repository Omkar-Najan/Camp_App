# Yelp Camp (v 1.0.0)

* Add landing page 
* Add Camp ground Page that list all campgrounds

each Campground has :
    * Name
    *Image

# layout a basic styling 

* create our header and footer partials 
* add in bootstrap

# Creating a New CampGround 
    * setup new campground POST route
    * Add in a body-parser
    * setup route to show form
    * add a basic unstyled form

# style campgrounds page
    * add abetter header
    * make componenrs align to grid

# style navbar and form
    * add navbar to all templets
    * style new campground form

# Add Mongoose
    * Install and configure mongoose
    * setup campground model
    * use campground model inside of our routes!
# Show Page
    * Review the RESTful routes we've seen so far
    * Add description to our campground model
    * show db.collection.drop()
    * Add a show route/template

# RESTful routes
name    |   url        verb     desc.
======================================
index   |   /dogs       GET     | Displays List of All Dogs
new     |   /dogs/new   GET     | Displays Form to Make a New Dog
create  |   /dogs       POST    | Adds New Dog to Database
Show    |   /dogs/:id   GET     | Shows Info about one dog

# refactor a mongoose code
    * create models directory
    * use module.exports
    * require everything correctly

# Add seeds file
    * add seed.js file
    * run seeds file evry time server starts

# add a comment model
    * make errors go away
    * display comments on campground show page

# Comment new/Create
    * Discuss nested routes
    * Add comment create and new route
    * add comment form

# Style show page V5
    * Add Sidebar to Show Page
    * Display Comments Nicely


# finish styling page
    * add public directory
    * add custom stylesheet

# Authentication

## Intro Auth 
* What tools are we using ?
    * passport
    * passport Local 
    * Passport Local Mongoose
* Walk through Auth flow
* Discuss sessoins
    * Express-session

# Auth part-1 add user model
* install all packages needed
* define user model

# auth part-2 register
* configure passport
* add register routes
* add register template

# Auth pt3 - Login
* add login logic
* add login templates 

# Auth-4 New logout/navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar
* Show/ hide auth links correctly

# Auth-5 show/hide nav links
* show/hide links in nsvbr accordindly

# refactor the routes
* use express routes to reorganize all routes

# User + Comment 
* Associte User and comment
* Save Authers name to a comment automatically.

# users + campgrounds
* prevent unauthorised user from creating a campground
* save username+id to newly created ampground

# Editing a campground
* Add method override
* add exit route for camogrounds
* add ink to edit page
* Add update Route

# Deleting Campgrounds
* Add destroy route
* Add Delete Button

# Authoriasation part 1
* User can only edit their campground
* User can delete only their campgrounds
* Hide show edit and delete buttons

# Editing Comments
* add edit route to comments
    * add edit button
    * add update route

# Deleting Comments
* Add destroy route
* Add delete button

# Authorisation to comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middileware

# Adding flash
* Demo working version
* Install and configure connect-flash
* Add bootstrap alerts to header

# Styling
* background slyder to landing page 
* styling a forms