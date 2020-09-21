const e = require("express");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo")

var postSchema = new mongoose.Schema({
    title:String,
    content:String
});

var userSchema = new mongoose.Schema({
    email:String,
    name:String,
    posts:[postSchema]
});

var User = mongoose.model("User", userSchema)



var Post = mongoose.model("Post", postSchema)
/*
var newUser = new User({
    email:"day2871@bad.com",
    name:"stevenWu"
});

newUser.posts.push({
    title:"how to learn to be a web rd",
    content:"i don't know but it's a nice try"
})


newUser.save(function(err, user){
    if(err){
        console.log(err)
    }else{
        console.log(user)
    };
});


var newPost = new Post({
    title:"Test for login",
    content:"this is test content"
});

newPost.save(function(err, newPost) {
    if(err){
        console.log(err)
    }else(
        console.log(newPost)
    );
});
*/

User.findOne({name:"stevenWu"}, function(err, user) {
    if(err){
        console.log(err)
    } else{
       user.posts.push({
           title:"a new post to test",
           content:"this is test text "
       })
       user.save(function(err, user){
        if(err){
            console.log(err)
        }else{
            console.log(user)
        }});
    }
    
})