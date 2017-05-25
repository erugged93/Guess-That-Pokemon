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


$(document).ready(function() {
	
	// alert(pokemon.random());

	// console.log(pokemon.isGen(151,1));
	// console.log(pokemon.makeGuess(150,"Mewtwo"));
    $("#demo").html("Hello, World!");
    var wrapper         = $(".input_fields_wrap"); //Fields wrapper

    $("#button").on("click",function(){
    	if (!beenClicked)
    	{
    		beenClicked = true;
    		$("#button").html("Make your first guess");
    		$(wrapper).append('<div><input type="text" name="mytext[]"/></div>');
    		$(wrapper).append('<form id="guess" action=""><input type="radio" name="criteria" value="name"> Name<br><input type="radio" name="criteria" value="generation"> Generation<br>' +
    			'<input type="radio" name="criteria" value="type"> Type<br></form>')
    	}
    	else
    	{
    		// $("#button").html("Sike");
    		alert($('input[name=criteria]:checked', '#guess').val());
    		alert(pokemon.isGen(151,1));
   				 	}
    });

    $('#guess input').on('check', function() {
   alert($('input[name=criteria]:checked', '#guess').val()); 
});

    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').remove();
    })

});