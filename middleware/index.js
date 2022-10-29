var middlewareObj = {}
var Campground = require("../models/campgrounds")
var Comment = require("../models/comments")
middlewareObj.checkCampgroundOwnership  = function(req , res , next){
    if(req.isAuthenticated()){
        // does user own campground
        Campground.findById(req.params.id , function(err , foundcampground){
            if(err){
                req.flash("error" , "Campground Not found")
                res.redirect("back");
            }else{
                // doesnuser own campground
                // @ts-ignore
                if(foundcampground.author.id.equals(req.user._id) ){
                    next();
                }else{
                    req.flash("error" , "Access Denied")   
                    res.render("/campgrounds"+ req.params.id);
                }
            }
        })
    }else{
        req.flash("error" , "You need to own this campground")
        res.redirect("/campgrounds/"+ req.params.id)
    }
}
 

middlewareObj.checkCommentOwnership = function (req,res ,next){
    if(req.isAuthenticated()){
        // does user own campground
        Comment.findById(req.params.comment_id , function(err , foundComment){
            if(err){
                res.redirect("back");
            }else{
                // doesnuser own campground
                // @ts-ignore
                if(foundComment.author.id.equals(req.user._id) ){
                    next();
                }else{   
                    req.flash("error" , "You dont have permission to do that")
                    res.render("back");
                }
            }
        })
    }else{
        req.flash("error" , "you need to Log in !")
        res.redirect("back")
    }
}

middlewareObj.isLoggedIn = function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error" , "Need to be loged in !")
    res.redirect("/login");
}

module.exports = middlewareObj