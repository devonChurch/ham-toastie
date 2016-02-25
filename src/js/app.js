'use strict';

const randomise = require('./randomise');
const segment = require('./segment');
const thumbnail = require('./thumbnail');



{
	const data = randomise.init();
	console.log(data);

	const dom = segment.init(data);
	console.log(dom);

	document.body.innerHTML += dom;

}
