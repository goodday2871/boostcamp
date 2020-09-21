//check off specific todo  by click
$("ul").on("click","li",function(){
   $(this).toggleClass("done")})

// click on x to delete todo

$("ul").on("click","span",function(event){
    $(this).parent().fadeOut(500,function(){
        $(this).remove();
    });
    event.stopPropagation();
})

//add todo list

$("input[type='text']").on("keypress",function(e){
    if(e.which===13){
        var todoText=$(this).val()
        $(this).val("") 
        $("ul").append("<li><span> <i class='far fa-trash-alt'></i> </span>"+" "+todoText+"</li>")     
    }
})
$("#showbtn").on("click",function(){
    $("input").toggleClass("show")
})