'use strict';

module.exports = (() => {

	const

	init = (data) => {

        return (
			`<svg version="1.0"
				  xmlns="http://www.w3.org/2000/svg"
				  xmlns:xlink="http://www.w3.org/1999/xlink"
				  viewBox="0 0 100 100"
				  x="0px"
				  y="0px">
				  <polyline stroke-miterlimit="10" points="${calcPoints(data.path)}"/>

			</svg>`
		);

		// <line stroke-miterlimit="10" x1="100" y1="100" x2="61.8" y2="0"/>

    },

	calcPoints = (path) => {

		// points="100,100 80.9,68 90.5,47 47,38.5 65.5,15.5 64.5,0 "

		let points = '';

		for (const coordinates of path) points += `${coordinates.x},${coordinates.y} `;

		return points;

	};

	return {
		init
	};

})();
