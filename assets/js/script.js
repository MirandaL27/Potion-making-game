var ingredients = ["honeycap","inkycap", "orangecrown" , "rondobello", "scarletflytrap"];
var currentIngredients = [];
var ingredientCounter = 0;
var bodyEl = $("body");

var getIngredientName = function(src){
    for(var i = 0; i<ingredients.length;i++){
        if(src.includes(ingredients[i])){
            return ingredients[i];
        }
    }
}

$(".ing-div").draggable({
    helper: "clone",
    appendTo: "body",
    start : function(event,ui){
        if(ingredientCounter > 2){
            $(".ing-div").draggable({disabled: true});
         }
        //event.target.style.backgroundColor = null;
        
    },

});

var disableIngredients = function(){
    $(".ing-card").attr("style","background-color:lightgrey;");
    $(".listen-btn").attr("style", "background-color:grey; border: 1px solid black; opacity: 50%");
    $(".ing-div").attr("style","opacity: 50%");
}

$(".cauldron-drop").droppable({
    drop: function(event, ui) {
        if(ingredientCounter > 2){
           disableIngredients();
        }
        else if(ingredientCounter > 3){
            return;
        }
        //ui.draggable.remove();
        var src = ui.draggable[0].innerHTML.replace("<img class=" +'"' +"ingredient w-50" +'"'+ " src=", "")
        src = src.replaceAll('"','')
        src = src.replace('>','');
        //console.log(src);
        event.target.style.backgroundColor = null;
        //update current ingredients array
        var divEl = $(".current-ing");
        var imgEl = $("<img>");
        
        var innerDiv = $("<div>")

        innerDiv.attr("class","card m-2 col-2");
        var cardHeader = $("<h4>");
        cardHeader.attr("class","card-header small");
        cardHeader.text(getIngredientName(src));
        currentIngredients.push(getIngredientName(src));
        ingredientCounter++;
        var imageDiv = $("<div>");
        //imgEl.attr("src","assets/images/honeycap.png");
        imgEl.attr("src", src);
        imgEl.attr("style", "width:25%")

        cardHeader.appendTo(innerDiv);
        imgEl.appendTo(imageDiv);
        imageDiv.appendTo(innerDiv);
        innerDiv.appendTo(divEl);
      },
      over: function(event, ui) {
          event.target.style.backgroundColor = "rgba(242, 240, 184,0.2)";
      },
});
 bodyEl.on("mouseover",".ing-card",function(event){
        if(ingredientCounter < 4){
            $(event.target).closest(".ing-card").addClass("hover");
        } 
});

bodyEl.on("mouseout",".ing-card",function(event){
    $(event.target).closest(".ing-card").removeClass("hover")
});