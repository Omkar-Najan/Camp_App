var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment    = require("./models/comments")
var data = [
    {
        name:"clouds rest",
        img:"https://www.incredibleindia.org/content/dam/incredibleindia/images/places/delhi/delhi-red-fort-0.jpg/_jcr_content/renditions/cq5dam.web.480.271.jpeg",
        description:"What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name:"Dessert rest",
        img:"https://www.incredibleindia.org/content/dam/incredibleindia/images/places/delhi/delhi-red-fort-0.jpg/_jcr_content/renditions/cq5dam.web.480.271.jpeg",
        description:"What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name:"canoion rest",
        img:"https://www.incredibleindia.org/content/dam/incredibleindia/images/places/delhi/delhi-red-fort-0.jpg/_jcr_content/renditions/cq5dam.web.480.271.jpeg",
        description:"this is a good campground"
    }
]


function seedDB(){
    // remove all campgrounds
    Campground.deleteMany({},function(err){
        if(err){
            console.log(err);
        }else{
            // console.log("removed");
        }    
        
        // add few campgrounds
        data.forEach(function(seed){
            Campground.create(seed,function(err,campdround){
                if(err){
                    console.log(err)
                }else{
                    // console.log("data is added")
                    // add a comment
                    Comment.create(
                        {
                            text:"this place is best",
                            author:"Homerm"
                        },function(err , comment){
                            if(err){
                                console.log(err);
                            }else{
                                campdround.comments.push(comment);
                                campdround.save();
                                // console.log("creaded new comment");
                                
                            }
                        })
                }
            })
        })
    });
}

module.exports = seedDB;