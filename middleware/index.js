var Campground= require("../models/campground"),
    Comment= require("../models/comment"),
    middlewareObj={};

//middle ware
middlewareObj.isLoggedIn=function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};

middlewareObj.checkCommentOwnership=function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err,foundComment){
            if(err || !foundComment){
                console.log(err);
                req.flash("error", "Sorry, that comment does not exist!");
                res.redirect("/comments");
            } else {
                //does the user own the comment?
                if(foundComment.author.id.equals(req.user.id)){
                    next();
                } else {
                    req.flash("error", "you don't have permission to do that.");
                    res.redirect("back");
                }
            }
        });
    }   else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.checkCampgroundOwnership=function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err,foundCampground){
            if(err || !foundCampground){
                console.log(err);
                req.flash('error', 'Sorry, that campground does not exist!');
                res.redirect("/campgrounds");
            } else {
                //does the user own the campground?
                if(foundCampground.author.id.equals(req.user.id)){
                    next();
                } else {
                    req.flash("error", "you don't have permission to do that.");
                    res.redirect("back");
                }
            }
        });
    }   else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

module.exports = middlewareObj;