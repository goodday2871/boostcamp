const { WSASERVICE_NOT_FOUND } = require("constants");
const e = require("express");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo")
var Post = require("./models/post")
var User = require("./models/user")


Post.create({
    title:"How to burn the kitchen 4",
    content:"Use metal bow in the microwaveOven four"
}, function(err, post){
   User.findOne({email:"goodday2871@gmail.com"}, function(err, user){
        if(err){
            console.log(err)
        }else{
            user.posts.push(post)
            user.save(function(err, data) {
                if(err){
                    console.log(err)
                }else{
                    console.log(data)
                }
            })
        }
   })
}    

)
/*
User.findOne({email:"goodday2871@gmail.com"}).populate("posts").exec(function(err, user){
    if(err){
        console.log(err)
    }else{
        console.log(user)
    }
});*/