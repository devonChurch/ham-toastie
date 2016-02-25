'use strict';

module.exports = (() => {

	const

	boolean = () => {

        return randomise({max: 1}) % 2 === 0 ? false : true;

    },

	randomise = ({min = 0, max}) => {

		console.log('__randomising__');

		return Math.floor(Math.random() * (max - min + 1)) + min;

	};

	return {
		boolean,
		randomise
	};

})();
