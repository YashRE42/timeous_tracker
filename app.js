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
    //create comments model
    Comment       = require("./models/comment"),
    //require seeder
    // seedDB        = require("./seed.js"),
    methodOverride= require("method-override"),
    flash= require("connect-flash");
    
var commentRoutes=require("./routes/comments.js"),
    campgroundRoutes=require("./routes/campgrounds.js"),
    indexRoutes=require("./routes/Index.js");

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

//seed database withcampgrounds
// seedDB();

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp has started");
});
