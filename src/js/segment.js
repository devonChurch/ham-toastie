'use strict';

module.exports = (() => {

	const

	init = (data) => {

        return (
			`<div class="pattern__segment"
				  style="background: hsl(${data.hue}, 50%, 50%)">
				<div class="pattern__flip">
					<div class="pattern__rotate pattern__rotate--${data.rotation}">
						${compiledSvgs(data.path)}
					</div>
				</div>
			</div>`
		);

    },

	compiledSvgs = (path) => {

		const svg = generateSvg(path);
		let html = '';

		for (let i = 0; i < 4; i += 1) html += svg;

		return html;

	},

	generateSvg = (path) => {

		return (
			`<svg class="pattern__svg"
				  style="stroke-width:2px;stroke:red;fill:transparent;"
				  version="1.0"
				  xmlns="http://www.w3.org/2000/svg"
				  xmlns:xlink="http://www.w3.org/1999/xlink"
				  viewBox="0 0 100 100"
				  x="0px"
				  y="0px">
				  <polyline stroke-miterlimit="10" points="${calcPoints(path)}"/>

			</svg>`
		);

	},

	calcPoints = (path) => {

		let points = '';

		for (const coordinates of path) points += `${coordinates.x},${coordinates.y} `;

		return points;

	};

	return {
		init
	};

})();
