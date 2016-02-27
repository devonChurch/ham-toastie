require('./sass/style.scss');
const hamToastie = require('./js/app');




{

    const thumbnails = document.getElementById('thumbnails');

    for (let i = 0; i < 1; i += 1) {

        const data = hamToastie.randomise.init();
        const segment = hamToastie.segment.init(data);
        const thumbnail = hamToastie.layout.init({segment, x: 20, y: 6, transition: true});

        thumbnails.innerHTML += thumbnail;

    }

}
