require('./sass/ham-toastie.scss');
const hamToastie = require('./js/app');

{

    const debug = false;

    if (debug) {

        // Small test script used to review generated patterns while developing.
        const thumbnails = document.getElementById('thumbnails');

        for (let i = 0; i < 1; i += 1) {

            const data = hamToastie.randomise.init();
            const segment = hamToastie.segment.init(data);
            const thumbnail = hamToastie.layout.init({segment, x: 20, y: 10, transition: true});

            thumbnails.innerHTML += thumbnail;

        }

    } else {

        // Setting up hook for Codepen demo.
        window.hamToastie = hamToastie;

    }

}
