var express = require("express")
var app = express();
const axios = require('axios');

app.get("/results",function(req,res){
    axios.get('http://www.omdbapi.com/?t=harry&apikey=thewdb&r=jason')
  .then(function (response) {
      var arr=[]
      var results=""
  arr = JSON.stringify(response.data)
    for(var i =0 ;i < arr.length;i++){
        if (arr[i]==='{'){
            results=results
        }else if(arr[i]==='"'){
            results=results
        }
        else if(arr[i]===","){
            results=results+"<br>"

        }else{
            results+=arr[i]
        }
    }
    res.send(results)
  })    
  
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
   
  });

})


app.listen(5500,function(){
    console.log("sever started")
})
