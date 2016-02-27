require('./sass/style.scss');
const hamToastie = require('./js/app');

{

    const debug = false;

    if (debug) {

        // Small test script used to review generated patterns while developing.
        const thumbnails = document.getElementById('thumbnails');

        for (let i = 0; i < 40; i += 1) {

            const data = hamToastie.randomise.init();
            const segment = hamToastie.segment.init(data);
            const thumbnail = hamToastie.layout.init({segment, x: 6, y: 6, transition: false});

            thumbnails.innerHTML += thumbnail;

        }

    } else {

        // Setting up hook for Codepen demo.
        window.hamToastie = hamToastie;

    }

}
