
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
	const info = pokemon[id-1];
	// alert(gen + ' ' + info.gen)
	if (info.gen === gen)
		return true;
	else
		return false;
}

exports.makeGuess = (id, guess) => {
	const info = pokemon[id-1];

	if (info.name === guess)
		return true;
	else
		return false;
}

exports.giveAnswer = (id) => {
	return pokemon[id-1].name;
}

exports.isEvolvedForm = (id) => {
	return pokemon[id-1].evoStage > 1;
}