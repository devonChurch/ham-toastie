'use strict';

const helpers = require('./helpers');

module.exports = (() => {

	const

	size = 100,

	path = [],

	init = () => {

		console.log('Init...');

		const path = buildPath();
		const rotation = calcRotation();

		return {path, rotation};

	},

	buildPath = () => {

		// const start = calcStart();

		const data = [calcStart()];
		let x = data[0].x;
		let y = data[0].y;

		while(y < size && x > 0 && x < size) {

			// console.log(x, y);

			// const offsetX = offsetPath();
			// const offsetY = offsetPath();

			x = helpers.boolean() ? x - offsetPath() : x + offsetPath();
			y += offsetPath();

			data.push({x, y});

		}

		console.log(data);

		return data;

	},

	offsetPath = () => {

		return helpers.randomise({max: 10});

	},

	calcStart = () => {

		// const plane = helpers.randomise(4);
		// const variableAxis = helpers.randomise(100);
		// const coordinates = [
		// 	{ // Top.
		// 		x: variableAxis,
		// 		y: 0
		// 	},
		// 	{ // Right.
		// 		x: 100,
		// 		y: variableAxis
		// 	},
		// 	{ // Bottom.
		// 		x: variableAxis,
		// 		y: 100
		// 	},
		// 	{ // Left.
		// 		x: 0,
		// 		y: variableAxis
		// 	}
		// ];
		//
		// return coordinates[plane];

		const x = helpers.randomise({max: 100});
		const y = 0;

		return {x, y};

	},

	calcRotation = () => {

		const i = helpers.randomise({max: 3});

		return 90 * i;

	};

	return {
		init
	};

})();
