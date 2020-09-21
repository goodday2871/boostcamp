var express = require("express")
var app = express();

app.use(express.static("public"))
app.set("view engine","ejs")


app.get("/",function(req,res){
    res.render("home")

    /*res.send("<h1>welcome to the home page</h1>")*/
})


app.get("/fallinlovewith/:thing",function(req,res){
    var thing = req.params.thing;
    res.render("love",{thingVar: thing})
})


app.get("/posts" , function(req,res){
    var posts = [
        {title:"post1",author:"suzuki"},
        {title:"post2",author:"honda"},
        {title:"post3",author:"kawasaki"},
    ];
res.render("posts",{posts:posts})
})






app.listen(5500,function(){
    console.log("sever started")
})