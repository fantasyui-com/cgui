const fs = require('fs');
const postcss = require('postcss');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

fs.readFile('src/app.css', (err, css) => {
    postcss([precss, autoprefixer])
        .process(css, { from: 'src/app.css', to: 'dest/app.css' })
        .then(result => {
            fs.writeFile('dist/app.css', result.css);
            if ( result.map ) fs.writeFile('dist/app.css.map', result.map);
        });
});
