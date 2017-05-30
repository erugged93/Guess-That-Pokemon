
var beenClicked = false;

var pokemon = require('./index.js');
var $ = require('jquery');
var pokeApiURL = "http://pokeapi.co/api/v2/pokemon/";
// var answerPokemon = Math.floor((Math.random() * 386) + 1);
var answerPokemon = 6;
function tryParse(input) {
  return parseInt(input, 10) === NaN ? -1 : parseInt(input,10)
}

function answerYes() {
  return 'Yes <span class="glyphicon glyphicon-ok"></span>';
}
function answerNo() {
  return 'No <span class="glyphicon glyphicon-remove"></span>'
}


$(document).ready(function() {

  // alert(pokemon.random());

  // console.log(pokemon.isGen(151,1));
  // console.log(pokemon.makeGuess(150,"Mewtwo"));
  $.getJSON(pokeApiURL + answerPokemon + "/", function( data ) {
    var items = '';
    jQuery.each(data.types, function() {
      // alert(this.type.name);
      items += this.type.name + '/';
      // items += item[index].type.name + '/';
    })
    // alert(data.types[0].type.name);
    alert(items);
    var result = pokemon.addTypeInfo(answerPokemon, items)
    alert(result);
    // TODO: Save this type info to the data structure
    
  // $.each( data, function( key, val ) {
  //   items.push( "<li id='" + key + "'>" + val + "</li>" );
  // });

    $("#dropdown-menu").append(items);
  });
  $("#demo").html("Hello, World!");
  var wrapper         = $(".input_fields_wrap"); //Fields wrapper
  var guesses 		= $("#guesses");
  var warning = $("#warning");

  var numOfGuesses = 1;
  $(guesses).hide();
  $(wrapper).hide();
  $(warning).hide();

  $("#button").on("click",function(){
    if (!beenClicked)
    {
      beenClicked = true;
      $("#button").html("Make your first guess");
      $(wrapper).show();
      $("#radio_name").prop("checked", true);
    }
    else
    {
      if (numOfGuesses === 1)
      {
        $(guesses).show();
        $("#button").html("Make your next guess");
      }
      var guess = $("#answer").val();
      var radioSelection = $('input[name=criteria]:checked', '#guess').val();
      switch (radioSelection) {
        case "name":
        var answer = pokemon.makeGuess(answerPokemon,guess)
        if (answer)
        $(guesses).append('<h5>Guess ' + numOfGuesses + ': Is it ' + guess +'?' + answerYes() +'\nYOU WIN!!!!');
        else {
          $(guesses).append('<h5>Guess ' + numOfGuesses + ': Is it ' + guess +'?' + answerNo() );
        }
        numOfGuesses++;
        break;
        case "generation":
        var genGuess =  tryParse(guess)
        if (genGuess === -1 || genGuess > 3)
        {
          $(warning).show().html("You have entered an invalid generation number");
        }
        else
        {
          $(guesses).append('<h5>Guess ' + numOfGuesses + ': Is it generation ' + genGuess +'? '+ (pokemon.isGen(answerPokemon,genGuess) ? answerYes():answerNo()));
          numOfGuesses++;
        }
        break;
        case "type":
        var typeGuess = $('#selected').text();
        alert(typeGuess);
        if (typeGuess === 'Type'){
          alert("Must select type first!");
        }
        else {
          $(guesses).append('<h5>Guess ' + numOfGuesses + ': Is it type ' + typeGuess +'? '+ (pokemon.isType(answerPokemon,typeGuess) ? answerYes():answerNo()));
          numOfGuesses++;
        }
        break;
        case "evolution":
        var evoGuess = tryParse(guess)
        if (evoGuess === -1 || evoGuess > 4)
        alert("You have entered an invalid evolution stage number")
        else
        {
          $(guesses).append('<h5>Guess ' + numOfGuesses + ': Is it evolution stage ' + evoGuess +'? '+ (pokemon.isEvoStage(answerPokemon,evoGuess) ? answerYes():answerNo()));
          numOfGuesses++;
        }
        break;
        default:

      }
    }
  });

  $('.dropdown-menu li').click(function(){
    $('#selected').text($(this).text());
  });

  $("#evolved").on("click", function() {
    if (numOfGuesses === 1)
    {
      $(guesses).show();
    }
    $(guesses).append('<h5>Guess ' + numOfGuesses + ': Is it an evolved form? ' + (pokemon.isEvolvedForm(answerPokemon) ? answerYes():answerNo()));
    numOfGuesses++;
  });

  $("#legendary").on("click", function() {
    if (numOfGuesses === 1)
    {
      $(guesses).show();
    }
    $(guesses).append('<h5>Guess ' + numOfGuesses + ': Is it a legendary pokemon? ' + (pokemon.isLegendary(answerPokemon) ? answerYes() :answerNo()));
    numOfGuesses++;
  });

  $('#guess input').change('check', function() {
    var radioSelection = $('input[name=criteria]:checked', '#guess').val();
    if (radioSelection === "Type")
    {
      $("#answerInput").hide();
    }
    else {
      if (!$("#answerInput").is(':visible'))
        $("#answerInput").show();
      $("#answer").val("");
    }

  });

  $('#deleteWarning').on('click', function() {
    $(warning).hide();
  });

  $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
    e.preventDefault(); $(this).parent('div').remove();
  })

});
