var express= require("express"),
    router= express.Router({mergeParams: true}),
    Campground= require("../models/campground"),
    Comment= require("../models/comment"),
    middleware= require("../middleware");

router.get("/new", middleware.isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err,foundCampground){
        if(err){
            console.log("there was an error in finding by id for comment form");
        }else{
            //display comment creation form
            res.render("comments/new",{campground:foundCampground});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req,res){
     //find campground with provided id
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
        Comment.create(req.body.comment,function(err, comment){
                console.log(req.body.comment);
                if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
                }else{
                    //add username and id to comment
                    comment.author.id=req.user.id;
                    comment.author.username=req.user.username;
                    //save comment
                    comment.save();
                    //Push into campgrounds
                    campground.comments.push(comment.id);
                    //save campground
                    campground.save();
                    req.flash("success", "Successfully added comment");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//shows edit form for comments
router.get("/:comment_id/edit", middleware.isLoggedIn, middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            //display comment creation form
            res.render("comments/edit",{campgroundId:req.params.id , comment: foundComment});
        }
    });
});

//Comment update
router.put("/:comment_id/", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            //display comment
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//comment destroy route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "comment successfully deleted");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

module.exports = router;