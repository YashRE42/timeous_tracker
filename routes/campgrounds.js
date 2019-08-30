var express= require("express"),
    router= express.Router(),
    Campground= require("../models/campground"),
    middleware= require("../middleware");

//shows form
router.get("/", function(req, res){
    Campground.find({},function(err,allCampgrounds){
        if(err)
            console.log("error in database lookup");
        else
            res.render("campgrounds/Index",{campgrounds: allCampgrounds});
    });
});

router.post("/", middleware.isLoggedIn, function(req,res){
    //get data from form
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var author={
        id: req.user._id,
        username: req.user.username
    };
    var newCampground={name:name, image:image, description:desc, author: author};
    Campground.create(
        newCampground,
        function(err,newground){
        if(err)
            console.log(err);
        else 
            console.log("I made a campground");
    });
    res.redirect("/campgrounds");
});

router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

router.get("/:id",function(req,res){
    //find campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err || !foundCampground){
            console.log(err);
            req.flash('error', 'Sorry, that campground does not exist!');
            return res.redirect('/campgrounds');
        }else{
            //display campground with detail
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });
});

//shows edit form
router.get("/:id/edit", middleware.isLoggedIn, middleware.checkCampgroundOwnership, function(req,res){
    //find campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            //there won't be an error here, cause checkCampgroundOwnership worked...
        }else{
            //display edit campground form
            res.render("campgrounds/edit" ,{campground: foundCampground});
        }
     });
});
//updates campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

//deletes campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      }
    });
});

module.exports = router;