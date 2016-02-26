'use strict';

const helpers = require('./helpers');

module.exports = (() => {

	const

	size = 100,

	path = [],

	init = () => {

		console.log('Init...');

		const path = buildPath();
		const hue = calcHue();
		const rotation = calcRotation();

		return {path, hue, rotation};

	},

	buildPath = () => {

		const data = [calcStart()];
		let x = data[0].x;
		let y = data[0].y;

		while(y < size && x > 0 && x < size) {

			x = helpers.boolean() ? x - offsetPath() : x + offsetPath();
			y += offsetPath();

			data.push({x, y});

		}

		return data;

	},

	offsetPath = () => {

		return helpers.randomise({max: 10});

	},

	calcStart = () => {

		const x = helpers.randomise({max: 100});
		const y = 0;

		return {x, y};

	},

	calcHue = () => {

		return helpers.randomise({max: 360});

	},

	calcRotation = () => {

		const i = helpers.randomise({max: 3});

		return 90 * i;

	};

	return {
		init
	};

})();
