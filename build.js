const fs = require('fs');
const postcss = require('postcss');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const colorFunction = require("postcss-color-function")

const mergeRules = require('postcss-merge-rules');
const revolutionize = require('revolutionize');
const webfonts = require('web-fonts');
const cssnano = require('cssnano');
const specification = {
  import: "url('https://fonts.googleapis.com/css?family=Roboto:100')",
  family: "'Roboto', sans-serif",
  selector: 'html, input, button',
};

const declaration = {
  theme: 'tint',
  selectors: {
         page: ['.html'],
    container: ['.cgui-container'],
    component: ['.cgui-left', '.cgui-right'],
        label: ['.cgui-text', '.cgui-muted', 'html, input, button'],
        input: ['.cgui-command'],
       button: ['.cgui-execute'],
  }
}

fs.readFile('src/app.css', (err, css) => {
postcss([

  precss,
  colorFunction,
  revolutionize(declaration),
  webfonts(specification),
  autoprefixer,
  mergeRules,
  cssnano({ preset: 'default' }),

]).process(css, { from: 'src/app.css', to: 'dist/app.css' })
  .then(result => {
    fs.writeFile('dist/app.css', result.css);
    if ( result.map ) fs.writeFile('dist/app.css.map', result.map);
  }).catch(err=>{console.error(__filename, err)});
});
