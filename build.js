const fs = require('fs');
const postcss = require('postcss');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const colorFunction = require("postcss-color-function")
const revolutionize = require('revolutionize');


const revolution = {
  theme: 'tint',
  selectors: {
         page: ['.html'],
    container: ['.cgui-container'],
    component: ['.cgui-left', '.cgui-right'],
        label: ['.cgui-text', '.cgui-muted'],
        input: ['.cgui-command'],
       button: ['.cgui-execute'],
  }
}

fs.readFile('src/app.css', (err, css) => {
postcss([
  precss,
  colorFunction,
  revolutionize(revolution),
  autoprefixer
]).process(css, { from: 'src/app.css', to: 'dist/app.css' })
  .then(result => {
    fs.writeFile('dist/app.css', result.css);
    if ( result.map ) fs.writeFile('dist/app.css.map', result.map);
  }).catch(err=>{console.error(__filename, err)});
});
