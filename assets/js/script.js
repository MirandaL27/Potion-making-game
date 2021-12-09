class ingredient{
    name;
    frequency;
    pitchName;
    constructor(n, f, p){
        this.name = n;
        this.frequency = f;
        this.pitchName = p;
    }
}

//TO DO: make function to programmatically generate the list of ingredient elements 
//TO DO: get oscilator working for listen button in ingredients list
//TO DO: get listen button for cauldron working
//TO DO: get clear button working
//TO DO: get mix button for cauldron working - interval vector function, potion score.
//TO DO: make modal with potion image and score pop up with see explanation button
//TO DO: make see explanation screen 
//TO DO: make intervals and chords screen
//TO DO: make readme


var ingredients = [new ingredient("Honeycap",261.6,"C"),new ingredient("Inky Cap",277.2,"C#"), new ingredient("Orange Crown", 311.1,"D#"), new ingredient("Rondobello",370,"F#"), new ingredient("Scarlet Flytrap",493.9,"B")];
var currentIngredients = [];
var ingredientCounter = 0;
var bodyEl = $("body");
//var pitchFrequencies = [261.6, 277.2, 293.7, 311.1, 329.6,349.2, 370, 392, 415.3, 440, 466.2, 493.9];



class audio{
    context;
    osc; 
    pitchArray = [];
    setup(){
        //create audio context and oscillator and connect the ocsillator so that it can be played.
        this.context = new AudioContext;
        this.osc = this.context.createOscillator();
        this.osc.type = "sine";
        this.osc.connect(this.context.destination);
       return;
    }
    populatePitches(index){
        this.pitchArray.push(ingredient.index.frequency)
        //fill the pitch array with the frequencies needed to play each note in the row.
        return;
    }
    playPitches(row){
        this.setup();
        this.populatePitches(row);
        //play a series of pitches with the oscillator.
        for(var i = 0; i < this.pitchArray.length; i++){
            this.osc.frequency.setValueAtTime(this.pitchArray[i], this.context.currentTime + i);
            if (i == 0){
                this.osc.start(); 
            }
        }
        return;
    }
}


var makeSrcURL = function(name){
    //get rid of spaces in name, make all lowercase, 
    //"assets/images/inkycap.png"

    name = name.replaceAll(" ","").toLowerCase();
    var url = "assets/images/" + name + ".png";
    return url;
}

var getIngredientObject = function(src){
    for(var i = 0; i<ingredients.length;i++){
        var cStr = (ingredients[i].name).replaceAll(" ","").toLowerCase();
        console.log(cStr);
        if(src.includes(cStr)){
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
        console.log(ui.draggable[0].innerHTML);
        var src = ui.draggable[0].innerHTML//.replace("<img class=" +'"' +"ingredient w-50" +'"'+ " src=", "")
        //src = src.replaceAll('"','')
        //src = src.replace('>','');
        //console.log(src);
        event.target.style.backgroundColor = null;
        //update current ingredients array
        var divEl = $(".current-ing");
        var imgEl = $("<img>");
        
        var innerDiv = $("<div>")

        innerDiv.attr("class","card m-2 col-2");
        var cardHeader = $("<h4>");
        cardHeader.attr("class","card-header small");
        var obj = getIngredientObject(src)
        cardHeader.text(obj.name);
        currentIngredients.push(obj);
        ingredientCounter++;
        var imageDiv = $("<div>");
        imgEl.attr("src", makeSrcURL(obj.name));
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

bodyEl.on("click", ".listen-btn", function(event){
    console.log("listen button was clicked");
});