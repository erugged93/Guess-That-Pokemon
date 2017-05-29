
// const uniqueRandomArray = require('unique-random-array');
const pokemon = require('./data/pokemon.json');
var $ = require('jquery');

// const randomNumber = new Map()

// exports.randomPokemon = {
// 	var random = uniqueRandomArray(pokemon);
// 	// randomNumber.set();
// 	return random();
// }

exports.hello = {
	// alert("hello in index");
}

exports.isGen = (id, gen) => {
	var info = pokemon[id-1];
	// alert(gen + ' ' + info.gen)
	if (info.gen === gen)
		return true;
	else
		return false;
}

exports.makeGuess = (id, guess) => {
	var info = pokemon[id-1];

	if (info.name.toLowerCase() === guess.toLowerCase())
		return true;
	else
		return false;
}

exports.giveAnswer = (id) => {
	return pokemon[id-1].name;
}

exports.isType = (id, typeGuess) => {
	return pokemon[id-1].Types.toLowerCase().indexOf(typeGuess.toLowerCase()) >=0;
}

exports.isEvolvedForm = (id) => {
	return pokemon[id-1].evoStage > 1;
}

exports.isLegendary = (id) => {
	return pokemon[id-1].legendary;
}

exports.isEvoStage = (id, evoStage) => {
	var info = pokemon[id-1];
	if (info.evoStage === evoStage)
		return true;
	else
		return false;
}
