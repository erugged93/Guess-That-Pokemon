
var beenClicked = false;

var pokemon = require('./index.js');
var $ = require('jquery');
var pokeApiURL = "http://pokeapi.co/api/v2/pokemon/";
var pokeSpeciesURL = "http://pokeapi.co/api/v2/pokemon-species/"
var pokeEvoURL = ""
var answerPokemon = Math.floor((Math.random() * 386) + 1);
// var answerPokemon = 6;
var sprite = ''
var guesses     = $("#guesses");
var pictureFrame = $('#pictureFrame');
var wrapper         = $(".input_fields_wrap"); //Fields wrapper
var lossMessage = $("#lossMessage");
var warning = $("#warning");
var mainFrame = $('#main-game');
var hasGuesses = false;
var partOfEvolutionChain = false;
  function tryParse(input) {
    return (isNaN(parseInt(input, 10)) ? -1 : parseInt(input,10));
  }

  function answerYes() {
    return 'Yes <span class="glyphicon glyphicon-ok"></span>';
  }
  function answerNo() {
    return 'No <span class="glyphicon glyphicon-remove"></span>'
  }
  function getPokemonInfo() {
    $.ajax({
        async: false,
        url: pokeApiURL + answerPokemon + "/", 
        success: function( data ) {
          var items = '';
          sprite = data.sprites.front_default;

          jQuery.each(data.types, function() {
          items += this.type.name + '/';;
          })
          var result = pokemon.addTypeInfo(answerPokemon, items)
        }
      }, getEvolutionChain());
    ;
  };
  function getEvolutionChain() {
    $.ajax({
      async: false,
      url: pokeSpeciesURL + answerPokemon + "/",
      success: function (data) {
        pokeEvoURL = data.evolution_chain.url;
        // alert(pokeEvoURL);
        // jQuery.each(data.chain.evolves_to, function() {
        //   alert(this.species.name);
        // });
      }
    });
    isPartOfEvolutionChain();
  };
  function isPartOfEvolutionChain() {
    alert(pokeEvoURL)
    $.ajax({
      async: false,
      url: pokeEvoURL,
      success: function (data) {
        partOfEvolutionChain = !jQuery.isEmptyObject(data.chain.evolves_to);
        // alert(jQuery.isEmptyObject(data.chain.evolves_to));
        alert(partOfEvolutionChain ? "cool" : "uncool");
        // jQuery.each(data.chain.evolves_to, function() {
        //   alert(this.species.name);
        // });
      }
    })
  }


  $(document).ready(function() {
    

  // alert(pokemon.random());
  function resetGuesses () {
    $(guesses).html('<h4>Previous Guesses</h4>');
    $(guesses).hide();
  }
    // alert(sprite);
  // $("#demo").html("Hello, World!");

  var numOfGuesses = 1;
  // alert('Hello');
  $(guesses).hide();
  $(wrapper).hide();
  $(warning).hide();
  $(pictureFrame).hide();



  
  // alert(sprite);
  // $('#answerImage').attr("src",sprite).on("load", function() {
    //   $('#answerImage').css('background-image', 'url(http://picture.de/image.png)');
    // });
  // $(pictureFrame).show();
  // // $(pictureFrame).children('img').attr("src",sprite);
  //   setTimeout(function () {
  //       $(pictureFrame).hide();
  //   }, 4000);
  // $(pictureFrame).hide()

  $("#button").on("click",function(){
    $(warning).hide();
    if (!beenClicked)
    {
      getPokemonInfo();
      beenClicked = true;
      $("#button").html("Make your first guess");
      $(wrapper).show();
      $("#radio_name").prop("checked", true);

    }
    else
    {
      if (numOfGuesses === 10)
      {
        // if(sprite==='')
        $(mainFrame).hide();
        $(pictureFrame).children('img').attr("src",sprite);
        $(pictureFrame).show();
      }
      var guess = $("#answer").val();
      var radioSelection = $('input[name=criteria]:checked', '#guess').val();
      if (guess === '' && radioSelection != "type")
          return;
      switch (radioSelection) {
        case "name":
        
        var answer = pokemon.makeGuess(answerPokemon,guess)
        if (answer)
        {  
          guesses.append('<h5>Guess ' + numOfGuesses + ': Is it ' + guess +'?' + answerYes() +'\nYOU WIN!!!!');
          pictureFrame.show();
          lossMessage.hide();
          pictureFrame.children('img').attr("src",sprite);
        }
        else {
          $(guesses).append('<h5>Guess ' + numOfGuesses + ': Is it ' + guess +'?' + answerNo() );
        hasGuesses = true;
        }
        numOfGuesses++;
        break;
        case "generation":
        var genGuess =  tryParse(guess);
        if (genGuess === -1 || genGuess > 3)
        {
          $(warning).show().html("You have entered an invalid generation number");
        }
        else
        {
          $(guesses).append('<h5>Guess ' + numOfGuesses + ': Is it generation ' + genGuess +'? '+ (pokemon.isGen(answerPokemon,genGuess) ? answerYes():answerNo()));
          numOfGuesses++;
          hasGuesses = true;
        }
        break;
        case "type":
        var typeGuess = $('#selected').text();
        if (typeGuess === 'Type'){
          $(warning).show().html("Must select type first!");
        }
        else {
          $(guesses).append('<h5>Guess ' + numOfGuesses + ': Is it type ' + typeGuess +'? '+ (pokemon.isType(answerPokemon,typeGuess) ? answerYes():answerNo()));
          numOfGuesses++;
          hasGuesses = true;
        }
        break;
        case "evolution":
        var evoGuess = tryParse(guess)
        if (evoGuess === -1 || evoGuess > 4)
          $(warning).show().html("You have entered an invalid evolution stage number");
        else
        {
          $(guesses).append('<h5>Guess ' + numOfGuesses + ': Is it evolution stage ' + evoGuess +'? '+ (pokemon.isEvoStage(answerPokemon,evoGuess) ? answerYes():answerNo()));
          numOfGuesses++;
          hasGuesses = true;
        }
        break;
      }
      if (hasGuesses)
        {
          $(guesses).show();
          $("#button").html("Make your next guess");
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

  $("#evoChain").on("click", function() {
    if (numOfGuesses === 1)
    {
      $(guesses).show();
    }
    guesses.append('<h5>Guess ' + numOfGuesses + ': Is it a part of an evolution chain? ' + (partOfEvolutionChain ? answerYes() :answerNo()))
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

  $("#resetGame").on("click",function() {
    // $('#main-game').show();
    alert('Button Pressed');
    $(mainFrame).show();
    $(pictureFrame).hide();
    resetGuesses();
    // $('#picture').hide();
  });

  $('#deleteWarning').on('click', function() {
    $(warning).hide();
  });

  $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
    e.preventDefault(); $(this).parent('div').remove();
  })

});
