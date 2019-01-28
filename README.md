# Ham Toastie 🐖 🥓 🍞 😋

An SVG geometric pattern generator that can be:
+ Distilled down into a _concise/compact_ JSON syntax for _storage/reuse_.
+ Layered into a **pulsing** _hero background_ for presentation purposes.

## Demo 👀

### [Multiple randomised patterns](http://codepen.io/DevonChurch/full/LNYxya/)
![ham-toasty](https://user-images.githubusercontent.com/15273233/51814369-192fcf00-2320-11e9-82a2-bd974b29f879.gif)

### [Randomised animated pattern](http://codepen.io/DevonChurch/full/QNWQeE/)
![spotify-style-pulse](https://user-images.githubusercontent.com/15273233/51814356-f7cee300-231f-11e9-94f3-a1404b65cf73.gif)

## Installation 🤖

- Clone this repository
    ```
    git clone https://github.com/devonChurch/ham-toastie.git
    ```

- Install project dependancies
    ```
    npm install
    ```

- Start up a [Webpack](https://webpack.github.io/docs/webpack-dev-server.html) development server at http://localhost:8080/webpack-dev-server/
    ```
    npm start
    ```

## Usage ⚙

Below is the general process for injecting a pattern into the DOM. This process can be separated and run at applicable times e.g. you may want to generate the pattern parameters with node.js server side, generate the segment HTML on page load and render the pattern layout upon user interaction.

1. #### Require:
    Add the SASS and JS files to make Ham Toastie work.

    ```javascript
    const hamToastie = require(‘./ham-toastie’);
    ```

    ```
    @import: ‘ham-toastie’;
    ```

2. #### Randomise:
    Returns a unique set of pattern parameters as a Javascript object.

    ```javascript
    const data = hamToastie.randomise.init();

    // Generates the following object:
    // {
    //     hue: {...},
    //     luminosity: {...},
    //     path: [...],
    //     rotation: 180,
    //     saturation: {...},
    //     width: 2
    // }
    ```

3. #### Segment:
    Returns an HTML segment derived from the pattern parameter object. A segment represents a pattern distilled down to its simplest form.

    ```javascript
    const segment = hamToastie.segment.init(data);
    ```

4. #### Layout:
    Returns a HTML string holding the complete pattern layout generated from the supplied parameters.

    ```javascript
    const layout = hamToastie.layout.init({
        // The segment HTML produced from hamToastie.segment.
        segment,
        // How many segments wide and height should the pattern layout be? The x
        // and y parameters should be positive values in addition to being even.
        // If the values are not supplied correctly they will be adjusted
        // accordingly for your convenience.
        x: 20, y: 10,
        // Should the patten begin a pulse animation after being injected into
        // the DOM?
        transition: true
    });
    ```

    ###### Note:
    - You can always start the animation sequence later by supplying the class *pattern--trueTransition* to the main *pattern* element.
    ```javascript
    var pattern = document.getElementsByClassName('pattern')[0];
    pattern.classList.add('pattern--trueTransition');
    ```
    - Since the pulse animation is driven completely via CSS you will need to define the possible segment arrangements that you will use during a pages lifecycle. This lets SASS figure out the exact centre of the pattern so that the pulse emanates from the correct location. We also modify animation scale properties based on the amount of segments per axis.You can account for a wide range of permutations via a SASS loop however this will result in redundant code bloat so purposely defining your layouts is more sensible.
    ```
    // The above two demos use an 8x8 and a 20x10 segment grid so we account for
    // these here when preprocessing out sass.
    $xLayouts: 8, 20;
    $yLayouts: 8, 10;
    ```

## Example ✅

Inject 10 randomised static patterns with an 8x8 segment layout into the DOM.

```javascript

for (let i = 0; i < 10; i += 1) {

    const data = hamToastie.randomise.init();
    const segment = hamToastie.segment.init(data);
    const layout = hamToastie.layout.init({segment, x: 8, y: 8, transition: false});

    document.body.innerHTML += layout;

}
```

## License 📜

MIT
