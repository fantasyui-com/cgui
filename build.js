const fs = require('fs');
const postcss = require('postcss');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const colorFunction = require("postcss-color-function")

fs.readFile('src/app.css', (err, css) => {

    postcss([precss, colorFunction, autoprefixer])
        .process(css, { from: 'src/app.css', to: 'dist/app.css' })
        .then(result => {
            fs.writeFile('dist/app.css', result.css);
            if ( result.map ) fs.writeFile('dist/app.css.map', result.map);
        });

});
