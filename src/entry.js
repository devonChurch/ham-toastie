require('./sass/style.scss');
const hamToastie = require('./js/app');




{

    const thumbnails = document.getElementById('thumbnails');

    for (let i = 0; i < 20; i += 1) {

        const data = hamToastie.randomise.init();
        const segment = hamToastie.segment.init(data);
        const thumbnail = hamToastie.layout.init({segment, x: 10, y: 10, transition: true});

        thumbnails.innerHTML += thumbnail;

    }

}
