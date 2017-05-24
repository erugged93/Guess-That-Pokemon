'use strict';
// const uniqueRandomArray = require('unique-random-array');
const pokemon = require('./data/pokemon.json');

const randomNumber = new Map()

exports.random = {
	// const random = uniqueRandomArray(pokemon);
	// randomNumber.set();
	// return random();
}

exports.isGen = (id, gen) => {
	const info = pokemon[id-1];
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