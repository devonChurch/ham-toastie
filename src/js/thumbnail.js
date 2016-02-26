'use strict';

module.exports = (() => {

	const

	size = 2,

	init = (segment) => {

        return (
			`<div class="pattern pattern--thumbnail">
				${generateRows(segment)}
			</div>`
		);

    },

	generateRows = (segment) => {

		let html = '';

		for (let i = 0; i < size; i += 1) {

			html += (
				`<div class="pattern__row">
					${generateSegments(segment)}
				</div>`
			);

		}

		return html;

	},

	generateSegments = (segment) => {

		let html = '';

		for (let i = 0; i < size; i += 1) html += segment;

		return html;

	};

	return {
		init
	};

})();
