var express = require("express");
var router = express.Router();
var passport = require("passport")
var User = require("../models/user")

router.get("/" , function(req ,res){
    res.render("landing");
});

// Index Route - shows all campgrounds
// root route Register route
router.get("/register" , function(req , res){
    res.render("register");
})

// sighup logic

router.post("/register" , function(req,res){
     ;
// @ts-ignore
    User.register(new User({username:req.body.username}),req.body.password, function(err,user){
        if(err){
            req.flash("error" , err.message );
            return res.render("register");
        }
        passport.authenticate( "local")(req,res ,function(){
            req.flash("success" , "welcome to yelpCamp " + user.username)
            res.redirect("/campgrounds");
        });
    });
});

// login routes

router.get("/login" , function(req,res){
    res.render("login")
})


// login logic
router.post("/login",passport.authenticate("local" ,{
    successRedirect:"/campgrounds",
    failureRedirect:"login"
}), function(req,res){

})

router.get("/logout" , function(req,res){
    req.logOut();
    req.flash("success" , "logged you out")
    res.redirect("back");
})

module.exports = router;