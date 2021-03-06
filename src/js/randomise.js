'use strict';

const helpers = require('./helpers');

module.exports = (() => {

	const

	size = 100,

	init = () => {

		const path = buildPath();
		const hue = calcHue();
		const saturation = calcPercentage({min: 30, max: 100, seperate: 40});
		const luminosity = calcPercentage({min: 20, max: 60, seperate: 40});
		const width = calcWidth();
		const rotation = calcRotation();

		return {path, hue, saturation, luminosity, width, rotation};

	},

	buildPath = () => {

		const data = [calcStart()];
		let x = data[0].x;
		let y = data[0].y;

		while (y < size && x >= 0 && x <= size) {

			x = helpers.boolean() ? x - offsetPath() : x + offsetPath();
			if (y < size / 2) x = x < 0 ? 0 : x > size ? size : x;

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

		const background = helpers.randomise({max: 360});
		const path = helpers.randomise({max: 360});

		return {background, path};

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

	calcWidth = () => {

		const min = 2;
		const max = 5;

		return helpers.randomise({min: min, max: max});

	},

	calcRotation = () => {

		const i = helpers.randomise({max: 3});

		return 90 * i;

	};

	return {
		init
	};

})();
