var ingredients = ["honeycap","inkycap", "orangecrown" , "rondobello", "scarletflytrap"];

var currentIngredients = [];

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
        event.target.style.backgroundColor = null;
    },

});

$(".cauldron-drop").droppable({
    drop: function(event, ui) {
        //ui.draggable.remove();
        var src = ui.draggable[0].innerHTML.replace("<img class=" +'"' +"ingredient w-50" +'"'+ " src=", "")
        src = src.replaceAll('"','')
        src = src.replace('>','');
        console.log(src);
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