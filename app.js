var express         = require("express");
var flash           = require("connect-flash");
var app             = express();
var bodyparser      = require("body-parser");
var mongoose        = require('mongoose');
var Campground      = require("./models/campgrounds");
var seedDB          = require("./seeds");
var Comment         = require("./models/comments")
var passport        = require("passport");
var localSrategy    = require("passport-local");
var User            = require("./models/user");
var methodOverride  = require("method-override")

// routes  requiring
var commentRoutes       = require("./routes/comments");
var campgroundRoutes    = require("./routes/campgounds");
var indexRoutes         = require("./routes/index");

mongoose.connect("mongodb+srv://omkar:omkarnajan@cluster0.lik8i.mongodb.net/?retryWrites=true&w=majority" , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false  })


app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();  // seed the database
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again I'am best",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
// @ts-ignore
passport.use(new localSrategy(User.authenticate()));
// @ts-ignore
passport.serializeUser(User.serializeUser());
// @ts-ignore
passport.deserializeUser(User.deserializeUser());
// currentuser is broadcasted to every route
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})
// require route files
app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

// to listen on post
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
 