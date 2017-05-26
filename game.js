// var jsdom = require("jsdom").jsdom;
// jsdom.env("", function(err, window) {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     global.$ = require("jquery")(window);
// })

// $(document).ready(function() {
    
// 	var pokemon = require('./index.js');

// 	console.log(pokemon.isGen(151,1));
// 	console.log(pokemon.makeGuess(150,"Mewtwo"));
// 	alert("Hello");

//     // $("button").on("click",function(){
//     //   alert("hello");
//     //   for (var i = 0; i < 152; i++) {
//     //   $.ajax({
//     //     headers:{  
//     //        "key":"your key",
//     //  "Accept":"application/json",//depends on your api
//     //   "Content-type":"application/x-www-form-urlencoded"//depends on your api
//     //     },   url:"http://pokeapi.co/api/v2/pokemon/"+i+"/",
//     //     success:function(response){
//     //       var r=JSON.parse(response);
//     //       // $("#main").html(r.base);
//     //       console.log(r);
//     //     }
//     //   });
// //   }
// // });
// });

// alert("Hello");
var beenClicked = false;
// var pokemon = $.ajax({
//   url: "./index.js",
//   dataType: 'script',
//   data: {
//   	format: 'js'
//   },
//   async: false
// });

var pokemon = require('./index.js');
var $ = require('jquery');
var answerPokemon = Math.floor((Math.random() * 386) + 1);


$(document).ready(function() {
	
	// alert(pokemon.random());

	// console.log(pokemon.isGen(151,1));
	// console.log(pokemon.makeGuess(150,"Mewtwo"));
    $("#demo").html("Hello, World!");
    var wrapper         = $(".input_fields_wrap"); //Fields wrapper
    var guesses 		= $("#guesses");

    var numOfGuesses = 0;
    $(guesses).hide();
    $(wrapper).hide();

    $("#button").on("click",function(){
    	if (!beenClicked)
    	{
    		beenClicked = true;
    		$("#button").html("Make your first guess");
    		$(wrapper).show();
    	}
    	else
    	{
    		if (numOfGuesses === 0)
    			$(guesses).show();
    		var guess = $("#answer").val();
    		// $("#button").html("Sike");
    		if ($('input[name=criteria]:checked', '#guess').val()==="name")
    		{	
    			$(guesses).append('<h5>Guess ' + numOfGuesses + ': Is it ' + guess +'? '+ (pokemon.makeGuess(answerPokemon,guess) ? 'Yes':'No'));
    			numOfGuesses++;
    		}
    		if ($('input[name=criteria]:checked', '#guess').val()==="generation")
    		{	
    			var genGuess = parseInt(guess, 10) === NaN ? -1 : parseInt(guess,10)
    			if (genGuess === -1 || genGuess > 3)
    				alert("You have entered an invalid generation number")
    			else
    			{
    				$(guesses).append('<h5>Guess ' + numOfGuesses + ': Is it generation ' + genGuess +'? '+ (pokemon.isGen(answerPokemon,genGuess) ? 'Yes':'No'));
    				numOfGuesses++;
    			}	
    			
    		}
    		if ($('input[name=criteria]:checked', '#guess').val()==="type")
    		{
    			$(guesses).append('<h5>The answer is: ' + (pokemon.giveAnswer(answerPokemon)));
    		}
    		if ($('input[name=criteria]:checked', '#guess').val()==="evolution") 
    		{
    			var evoGuess = parseInt(guess, 10) === NaN ? -1 : parseInt(guess,10)
    			if (evoGuess === -1 || evoGuess > 4)
    				alert("You have entered an invalid evolution stage number")
    			else
    			{
    				$(guesses).append('<h5>Guess ' + numOfGuesses + ': Is it evolution stage ' + evoGuess +'? '+ (pokemon.isEvoStage(answerPokemon,evoGuess) ? 'Yes':'No'));
    				numOfGuesses++;
    			}
    		}
   		}
    });

    $("#evolved").on("click", function() {
    	if (numOfGuesses === 0)
    	{
    		$(guesses).show();
    	}	
    	$(guesses).append('<h5>Guess ' + numOfGuesses + ': Is it an evolved form? ' + (pokemon.isEvolvedForm(answerPokemon) ? 'Yes':'No'));
    });

    $('#guess input').on('check', function() {
   alert($('input[name=criteria]:checked', '#guess').val()); 
});

    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').remove();
    })

});