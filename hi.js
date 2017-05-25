// var jsdom = require('jsdom').jsdom
//   , myWindow = jsdom().createWindow()
//   , $ = require('jQuery')
//   , jq = require('jQuery').create()
//   , jQuery = require('jQuery').create(myWindow)
//   ;

// var $ = require('jQuery');

// $(document).ready(function() { 
	var pokemon = require('./index.js');
	alert(pokemon.random());

	console.log(pokemon.isGen(151,1));
	console.log(pokemon.makeGuess(150,"Mewtwo"));