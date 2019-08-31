//================================================
//                    setup
//================================================

var express       = require("express"),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    app           = express(),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    //create user model
    User          = require("./models/user"),
    //create campground model
    Campground    = require("./models/campground"),
    // Create category model
    Category = require("./models/category");
    //create comments model
    Comment       = require("./models/comment"),
    //require seeder
    // seedDB        = require("./seed.js"),
    methodOverride= require("method-override"),
    flash= require("connect-flash");
    
var commentRoutes=require("./routes/comments.js"),
    campgroundRoutes=require("./routes/campgrounds.js"),
    indexRoutes=require("./routes/Index.js");
    // categoryRoutes = require("./routes/category.js");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + "/public"));

app.set("view engine","ejs");

mongoose.connect("mongodb://localhost/yelp_camp");

//passport configuration
app.use(require("express-session")({
    secret:"IReallyAmSoEffinRock",
    resave:false,
    saveUninitialized:false
}));

//use flash for warnings/messages
app.use(flash());

app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
// app.use("/category",);


// Category routes

// SHOW route
app.get("/category", function(req,res){
    res.render("showcat");
})

// NEW Route
app.get("/category/new", function(req, res){
    res.render("category");
})

// CREATE Route
app.post("/category", function(req, res){
    var category = req.body.category;
    var color = req.body.color;
    var newCategory = {
        category: category,
        color: color,
    };

    // console.log(newCategory);
 
    Category.create(newCategory, function(err, newCat){
        if(err){
            console.log(err);
            res.redirect("/category"); 
        }else{
            res.redirect("/category");
            // console.log(newCat.category);
        }
    });
 
 });
 
 app.delete("/category/:id", function(req, res){
     Category.findByIdAndDelete(req.params.id, function(err){
         if(err){
             res.redirect("/category");
         }else{
             res.redirect("/category");
         }
     });
 })
 

//seed database withcampgrounds
// seedDB();

app.listen(3000,"localhost",function(){
    console.log("YelpCamp has started");
});
