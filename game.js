
var beenClicked = false;

var pokemon = require('./index.js');
var $ = require('jquery');
// var answerPokemon = Math.floor((Math.random() * 386) + 1);
var answerPokemon = 151;
function tryParse(input) {
	return parseInt(input, 10) === NaN ? -1 : parseInt(input,10)
}


$(document).ready(function() {

	// alert(pokemon.random());

	// console.log(pokemon.isGen(151,1));
	// console.log(pokemon.makeGuess(150,"Mewtwo"));
    $("#demo").html("Hello, World!");
    var wrapper         = $(".input_fields_wrap"); //Fields wrapper
    var guesses 		= $("#guesses");

    var numOfGuesses = 1;
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
    		if (numOfGuesses === 1)
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
    			var genGuess =  tryParse(guess)
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
    			var evoGuess = tryParse(guess)
    			if (evoGuess === -1 || evoGuess > 4)
    				alert("You have entered an invalid evolution stage number")
    			else
    			{
            var answer = pokemon.isEvoStage(answerPokemon,evoGuess)
            if (answer)
                $(guesses).append('<h5>Guess ' + numOfGuesses + ': Is it evolution stage ' + evoGuess +'? Yes\nYOU WIN!!!!');
            else {
                  $(guesses).append('<h5>Guess ' + numOfGuesses + ': Is it evolution stage ' + evoGuess +'? No');
                }
    				numOfGuesses++;
    			}
    		}
   		}
    });

    $("#evolved").on("click", function() {
    	if (numOfGuesses === 1)
    	{
    		$(guesses).show();
    	}
    	$(guesses).append('<h5>Guess ' + numOfGuesses + ': Is it an evolved form? ' + (pokemon.isEvolvedForm(answerPokemon) ? 'Yes':'No'));
      numOfGuesses++;
    });

    $("#legendary").on("click", function() {
    	if (numOfGuesses === 1)
    	{
    		$(guesses).show();
    	}
    	$(guesses).append('<h5>Guess ' + numOfGuesses + ': Is it a legendary pokemon? ' + (pokemon.isLegendary(answerPokemon) ? 'Yes':'No'));
      numOfGuesses++;
    });

    $('#guess input').change('check', function() {
   		$("#answer").val("");
	});

    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').remove();
    })

});
