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

alert("Hello");

$(document).ready(function() {
    $("#demo").html("Hello, World!");

    $("#button").on("click",function(){
    	alert("HELLO DUDE");
    });

});