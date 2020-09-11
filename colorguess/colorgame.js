var mode=6
var colors= []
var pickedColor ;
var squares = document.querySelectorAll(".square");
var message= document.getElementById("message");
var colorDisplay = document.querySelector("#colorDisplay");
var h1 = document.querySelector("h1")
var reset=document.querySelector("#reset")
var modeButton = document.querySelectorAll(".mode")


init();
function init(){

    setupButton();
    setupSquares();  
    renew();
}

function setupButton(){
    for(var i=0;i<modeButton.length;i++){
        modeButton[i].addEventListener("click",function(){
            modeButton[0].classList.remove("selected");
            modeButton[1].classList.remove("selected");
            this.classList.add("selected");
         
           /* if(this.textContent === "Easy"){
                mode=3;
            }else{
                mode=6
            }*/
    
        // in shorter way
            this.textContent ==="Easy" ? mode=3 : mode=6
    
            renew();
        })
    }
}
function renew(){ 
      //generate new color
      colors=generateRandomColors(mode);
      //pick a new random color array
      pickedColor = pickColor();
      //change colorDisplay to match picked color
      colorDisplay.textContent=pickedColor; 
      //reset text
      message.textContent=""
      reset.textContent="New Colors"
      //change square color
      for(var i=0;i<squares.length;i++){
        if(colors[i]){
            squares[i].style.display="block"
            squares[i].style.backgroundColor=colors[i]}
        else{
            squares[i].style.display="none"
        }
      }
      h1.style.backgroundColor="steelblue"
    
}
function setupSquares(){
    for(var i=0;i<squares.length;i++){
        //add color to squares
        squares[i].style.backgroundColor=colors[i]
        //add click function
        squares[i].addEventListener("click",function(){
            var clickedColor=this.style.backgroundColor
        //compare the color to answer
        
        if (clickedColor === pickedColor){
            message.textContent="Correct";
            ChangeColor(clickedColor);
            h1.style.backgroundColor=clickedColor
            reset.textContent="Play Again?"
        }else{
            this.style.backgroundColor="#232323"
            message.textContent="Try Again"
        }
        })
    }
}
/*easybtn.addEventListener("click",function(){
   easybtn.classList.add("selected");
   hardbtn.classList.remove("selected");
   mode=3;
   colors= generateRandomColors(mode);
   pickedColor = pickColor();
   colorDisplay.textContent = pickedColor
   for(var i=0;i<squares.length;i++){
    if (colors[i]){   
    squares[i].style.backgroundColor=colors[i]
   }else{
    squares[i].style.display="none"
    h1.style.backgroundColor="steelblue"
    message.textContent=""
   }
   }
   reset.textContent="New Colors"
})
hardbtn.addEventListener("click",function(){
    hardbtn.classList.add("selected")
    easybtn.classList.remove("selected")
    mode=6
    colors= generateRandomColors(mode);
   pickedColor = pickColor();
   colorDisplay.textContent = pickedColor
   for(var i=0;i<squares.length;i++){
    squares[i].style.display="block" 
    squares[i].style.backgroundColor=colors[i]
   }   reset.textContent="New Colors" 
   h1.style.backgroundColor="steelblue"
   message.textContent=""
})
*/
reset.addEventListener("click",function(){
 /*   //generate new color
    colors=generateRandomColors(mode);
    //pick a new random color array
    pickedColor = pickColor();
    //change colorDisplay to match picked color
    colorDisplay.textContent=pickedColor; 
    //change square color
    
    for(var i=0;i<squares.length;i++){
        squares[i].style.backgroundColor=colors[i]
    }
    h1.style.backgroundColor="steelblue"
    message.textContent=""
    this.textContent="New Colors"*/

    renew();
})



function ChangeColor(color){
    //change each color to right one
 for (var i=0;i<squares.length;i++){
     squares[i].style.backgroundColor=color
 }
};
function pickColor(){
 var random = Math.floor(Math.random()*colors.length)
  return colors[random]
};
function generateRandomColors(num){
//make an array
var arr =[]
//add num colors to array
for(var i=0;i<num;i++){
// get color push to array
arr.push(randomColor())
}//return array
return arr}
function randomColor(){
    //pick 0-255r
    var r = Math.floor(Math.random()*256)
    //pick 0-255g
    var g = Math.floor(Math.random()*256)
    //pick 0-255b
    var b = Math.floor(Math.random()*256)
    var color ="rgb("+r+", "+g+", "+b+")";

    return color
}