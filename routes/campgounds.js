var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds")
// @ts-ignore
// @ts-ignore
var user = require("../models/user")
var middleware = require("../middleware")

// @ts-ignore
// @ts-ignore
router.get("/",function(req,res){
    // get all campgrounds from DB
    Campground.find({},function(err,allcampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index" , {campgrounds:allcampgrounds});     
        }
    })
    // res.render("campgrounds" , {campgrounds:campgrounds});
});


// add new campgrounds to database
router.post("/",middleware.isLoggedIn , function(req,res){
    // get data from form  add to campgrounds array
    var name = req.body.name;
    var price = req.body.price
    var img= req.body.img;
    var desc = req.body.description
    var author ={

        // @ts-ignore
        id:          req.user._id,

        // @ts-ignore
        username:   req.user.username
    }
    var newCampground = {name:name,price : price , img:img , description:desc,author :author }
    // console.log(req.user);

    // create a new campground and save to database
    if(name ==="" || img === ""){
        res.redirect("/campgrounds")
    }else{
        // @ts-ignore
        // @ts-ignore
        Campground.create(newCampground,function(err,newlyCreated){
            if(err){
                console.log(err);
            }else{
                // render to campgrounds page
                // console.log(newlyCreated);
                
                res.redirect("/campgrounds");
            }
        })
    }
})

// NEW - shoes form 
// @ts-ignore
router.get("/new",middleware.isLoggedIn , function(req,res){
    res.render("campgrounds/new")
});

// SHOW - Shows more about one component
router.get("/:id" , function(req,res){
    // find campground with provided id

    Campground.findById(req.params.id).populate("comments").exec(function(err ,foundCampground){
        if(err){
            console.log(err)
        }else{
            res.render("campgrounds/show" , {campground: foundCampground})
        }
    });
    // render show template with matching id campground
});


// edit campground route 
router.get("/:id/edit",middleware.checkCampgroundOwnership , function(req , res){
        // @ts-ignore
        Campground.findById(req.params.id , function(err , foundcampground){
            res.render("campgrounds/edit",{campground : foundcampground});
        })

})

// update campground route          
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    // find an update correct campground
    // @ts-ignore
    Campground.findByIdAndUpdate(req.params.id,req.body.campground ,function(err,updatedCampground){
        if(err){
            res.redirect("/");
        }else{
            res.redirect("/campgrounds/" + req.params.id)
        }
    }) 
    // redirect to show page 
})

router.delete("/:id",middleware.checkCampgroundOwnership , function(req,res){
    Campground.findByIdAndRemove(req.params.id , function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
        
    })
})



module.exports = router;