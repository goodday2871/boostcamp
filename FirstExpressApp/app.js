var express = require("express");
var app = express();

app.get("/",function(req,res){
    res.send("Welcome to my assignment")
})

app.get("/speak/:animal",function(req,res){
/*    var ani = req.params.animal
    var spoke = function(ani){
        if (ani ==="pig"){
            return "Oink"
        }else if(ani ==="cow"){
            return "moo"
        }else if (ani === "dog"){
            return "woof!"}
        }
 */   
    var sounds = {
        pig : "Oink!",
        dog : "Woof!",
        cow : "moo",
        cat : "go away human",
        goldfish:"......"
    }
    var animal = req.params.animal
    var sound =sounds[animal]
    res.send("The "+animal+" says "+sound)
})
    
app.get("/repeat/:str/:times",function(req,res){
    var str = req.params.str
    var times = Number(req.params.times)
    var last =""
    for (var i =0; i<times;i++){
        last = last +" "+ str
    }
    res.send(last)
})


app.get("*",function(req,res){
    res.send("It's a wrong way!!!!")
})




app.listen(5500,function(){
    console.log("sever started")
})

