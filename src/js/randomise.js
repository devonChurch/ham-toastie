'use strict';

const helpers = require('./helpers');

module.exports = (() => {

	const

	size = 100,

	path = [],

	init = () => {

		const path = buildPath();
		const hue = calcHue();
		const saturation = calcPercentage({min: 60, max: 100, seperate: 40});
		const luminosity = calcPercentage({min: 40, max: 60, seperate: 40});
		const rotation = calcRotation();

		return {path, hue, saturation, luminosity, rotation};

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

	calcPercentage = ({min, max, seperate}) => {

		const one = helpers.randomise({min: min, max: max - seperate});
		const two = helpers.randomise({min: one + seperate, max: max});
		const swap = helpers.boolean();

		return {
			background: swap ? two : one,
			path: swap ? one : two
		};

	},

	calcRotation = () => {

		const i = helpers.randomise({max: 3});

		return 90 * i;

	};

	return {
		init
	};

})();
