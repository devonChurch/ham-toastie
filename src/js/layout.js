'use strict';

module.exports = (() => {

	const

	init = ({segment, x = 6, y = 6, transition = false}) => {

		x = standardiseAxis(x);
		y = standardiseAxis(y);
		segment = calcSegmentSize(segment, x);

        return (
			`<div class="pattern pattern--xAxis${x} pattern--yAxis${y} pattern--${transition}Transition"
				  style="background: ${extractBackground(segment)}; padding-top: ${calcHeight(x, y)}%;">
				<div class="pattern__wrapper">
					${generateRows(segment, x, y)}
				</div>
			</div>`
		);

    },

	extractBackground = (segment) => {

		const refStart = 'data-background="';
		const refEnd = '"';

		const cutStart = segment.indexOf(refStart) + refStart.length;
		segment = segment.substr(cutStart);
		const cutEnd = segment.indexOf(refEnd);

		return segment.substr(0, cutEnd).trim();

	},

	calcHeight = (x, y) => {

		return y / x * 100;

	},

	calcSegmentSize = (segment, x) => {

		const refStart = 'style="';
		const refEnd = '"';

		const cutStart = segment.indexOf(refStart) + refStart.length;
		const extractStart = segment.substr(0, cutStart);

		const cutEnd = segment.indexOf(refEnd);
		const extractEnd = segment.substr(cutEnd);

		const size = 100 / x;

		return `${extractStart}padding-top:${size}%; width:${size}%;${extractEnd}`;

	},

	generateRows = (segment, x, y) => {

		let html = '';

		for (let i = 0; i < y; i += 1) {

			html += (
				`<div class="pattern__row">
					${generateSegments(segment, x)}
				</div>`
			);

		}

		return html;

	},

	standardiseAxis = (axis) => {

		return axis < 2 ? 2 : axis % 2 > 0 ? axis + 1 : axis;

	},

	generateSegments = (segment, x) => {

		let html = '';

		for (let i = 0; i < x; i += 1) html += segment;

		return html;

	};

	return {
		init
	};

})();
