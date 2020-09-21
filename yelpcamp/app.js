var express     = require("express"),
    app         = express();
    bodyParser  = require("body-parser"),
    { render }  = require("ejs"),
    Campground  = require("./models/campgrounds"),
    seedDB      = require("./seeds"),
    Comment     = require("./models/comment"),
    path        = require("path"),
    __dirname = path.resolve();
seedDB();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


var mongoose = require("mongoose");
const campgrounds = require("./models/campgrounds");
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
                res.render("campgrounds/index",{campgrounds:allCampgrounds})
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
    res.render("campgrounds/new")
})

app.get("/campgrounds/:id", function(req,res){
    
    Campground.findById(req.params.id).populate("comment").exec(function(err, foundCampground){
        if(err){
            console.log(err)
        }else{
            res.render("campgrounds/show", {campground:foundCampground});
        }
    })
         // res.send("these will be a new page one day")
})

// comment routes
app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id ,function(err, campground){
        if(err){
            console.log(err)
        }else{
            res.render("comments/new", {campground:campground})
        }
    })
  
})

app.post("/campgrounds/:id/comments", function(req,res){
    //look up camp using id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
            res.redirect("/campgrounds");
        }else{
             // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                }else{
                    campground.comment.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
                }
            })
        }
    })
  
    //connect new comment to camp
    //redirect
})

app.listen(5500,function(){
    console.log("sever started")
});

