var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campgrounds");
var user            = require("../models/user")
var Comment = require("../models/comments");
var middleware = require("../middleware")

// this comments new
router.get("/new",middleware.isLoggedIn , function(req,res){
    // find campground by id
    Campground.findById(req.params.id , function(err,campground){
        if(err){
            console.log(err);
            
        }else{
            res.render("comments/new" , {campground:campground})
        }
    })
    
});
// create
router.post("/", middleware.isLoggedIn,function(req , res){ 
    Campground.findById(req.params.id , function(err , campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")  
        }else{ 
            // console.log(req.body.comment);
            
            Comment.create(req.body.comment , function(err , comment){
                if(err){
                    req.flash("error" , "something went wrong please retry !")
                    console.log(err);
                }else{         
                    // add username and id 
                    // @ts-ignore
                    comment.author.id = req.user._id;
                    // @ts-ignore
                    comment.author.username = req.user.username;
                    comment.save();
                    // @ts-ignore
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success" , "Comment added successfully")
                    res.redirect("/campgrounds/" + campground._id)
                }
            })
        }
    }) 
})
// edit
router.get("/:comment_id/edit",middleware.checkCommentOwnership , function(req , res){
    Comment.findById(req.params.comment_id , function(err , foundComment){
        if(err){
            res.redirect("back")
        }else{
            res.render("comments/edit",{ campground_id : req.params.id , comment : foundComment})
        }
    }) 
    
});

// edit to put 
router.put("/:comment_id",middleware.checkCommentOwnership , function(req , res){
    Comment.findByIdAndUpdate(req.params.comment_id ,req.body.comment ,function(err , updatedComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id)
        }
    } )
})

// Destroy route
router.delete("/:comment_id",middleware.checkCommentOwnership, function(req,res){
    // find by id and remo
    Comment.findByIdAndDelete(req.params.comment_id ,function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            req.flash("success" , "comment deleted successfully")
            res.redirect("/campgrounds/" + req.params.id)
        }
    } )
});



module.exports = router;