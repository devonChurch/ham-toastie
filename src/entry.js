require('./sass/style.scss');
const hamToastie = require('./js/app');




{
	const data = hamToastie.randomise.init();
	console.log(data);

	const segment = hamToastie.segment.init(data);
    console.log(segment);

	const thumbnail = hamToastie.thumbnail.init(segment);

	document.body.innerHTML += thumbnail;

}
