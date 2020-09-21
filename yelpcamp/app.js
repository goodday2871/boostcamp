var express     = require("express"),
    app         = express();
    bodyParser  = require("body-parser"),
    { render }  = require("ejs"),
    Campground  = require("./models/campgrounds")
    seedDB      = require("./seeds")
seedDB();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));



var mongoose = require("mongoose");
const { findOne } = require("./models/comment");
mongoose.connect('mongodb://localhost/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

//schema setup

/*
Campground.create(
    {   name:"granite hill",
        image:"https://hk.blog.kkday.com/wp-content/uploads/900_Camp_16-644x429@2x.jpg",
        description:"this is a beautiful camp but don't have water and bathroom"
    }, function(err,camp){
        if(err){
            console.log(err)
        }else{
            console.log("new camp created")
            console.log(camp)
        }
    }
)

*/

app.get("/",function(req,res){
    res.render("landing")
});


app.get("/campgrounds",function(req,res){
        //res.render("campgrounds",{campgrounds:campgrounds})
        Campground.find({}, function(err,allCampgrounds){
            if(err){
                console.log(err)
            }else{
                res.render("index",{campgrounds:allCampgrounds})
            }
        })
});

app.post("/campgrounds",function(req,res){
    var name = req.body.name;
    var image =req.body.image;
    var des=req.body.description;
    var newCampground={name: name,image: image,description: des}
    //create new date to database
    Campground.create(newCampground, function(err,newcamps){
        if(err){
            console.log(err)
        }else{
            res.redirect("/campgrounds")
        }
    })
    
})

app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs")
})

app.get("/campgrounds/:id", function(req,res){
    
    Campground.findById(req.params.id).populate("comment").exec(function(err, foundCampground){
        if(err){
            console.log(err)
        }else{
            console.log(foundCampground)
            res.render("show", {campground:foundCampground});
        }
    })
         // res.send("these will be a new page one day")
})


app.listen(5500,function(){
    console.log("sever started")
});

