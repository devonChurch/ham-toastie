'use strict';

module.exports = (() => {

	const

	boolean = () => {

        return randomise({max: 1}) % 2 === 0 ? false : true;

    },

	randomise = ({min = 0, max}) => {

		return Math.floor(Math.random() * (max - min + 1)) + min;

	},

	hsl = (data, type = 'background') => {

		return `hsl(${data.hue}, ${data.saturation[type]}%, ${data.luminosity[type]}%)`;

	};

	return {
		boolean,
		randomise,
		hsl
	};

})();
