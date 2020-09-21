const e = require("express");
var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment    =require("./models/comment");



var data=[
    {
        name:"Cloud Rest",
        image:"https://blog.tripbaa.com/wp-content/uploads/2019/01/%E5%AE%9C%E8%98%AD%E5%A4%A2%E5%B9%BB%E9%9C%B2%E7%87%9F.jpg",
        description:"blah blah blah"
    },
    {
        name:"Desert Mesa",
        image:"https://storage.googleapis.com/www-cw-com-tw/article/202005/purchase-reauisition-5eafc53d7d421.jpg",
        description:"blah blah blah"
    },
    {
        name:"Canyon Floor",
        image:"https://images.chinatimes.com/newsphoto/2017-06-23/900/20170623004301.jpg",
        description:"blah blah blah"
    },
]

function seedDB(){
    Campground.deleteMany({}, function(err){
        if(err){
        console.log("remove campgrounds")
        }
        data.forEach(function(seed){
            Campground.create(seed, function(err, Campground){
                if(err){
                    console.log(err)
                }else{
                    Comment.create({
                        text:"This place is great , but doesn't have bathroom",
                        author:"Homer"
                    }, function(err, comment){
                        if (err){
                            console.log(err)
                        }else{
                            Campground.comment.push(comment);
                            Campground.save();
                            console.log("create")
                        };
                        

                    }
                    )
                }
            })
        })
    })
 

}

module.exports = seedDB;

