'use strict';

module.exports = (() => {

	const

	init = ({segment, modifier = 'thumbnail', x = 6, y = 6, transition = false}) => {

        return (
			`<div class="pattern pattern--${modifier} pattern--xAxis${x} pattern--yAxis${y} pattern--${transition}Transition"
				  style="background: ${extractBackground(segment)}; padding-top: ${calcHeight(x, y)}%;">
				<div class="pattern__wrapper">
					${generateRows(calcSegmentSize(segment, x), x, y)}
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
		const cut = segment.indexOf(refStart) + refStart.length;
		const size = 100 / x;

		return `${segment.substr(0, cut)}padding-top:${size}%; width:${size}%;${segment.substr(cut + 1)}`;

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

	generateSegments = (segment, x) => {

		let html = '';

		for (let i = 0; i < x; i += 1) html += segment;

		return html;

	};

	return {
		init
	};

})();
