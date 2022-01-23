const mix = require('laravel-mix');
const glob = require('glob');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

(glob.sync('resources/js/pages/*.js') || []).forEach(file => {
    mix.js(file, `public/${file.replace('resources/', '')}`)
    .sourceMaps()
    .version();
});

// mix.js('resources/js/pages/story_form.js', 'public/js/pages')
// .js('resources/js/pages/story.js', 'public/js/pages')
// .sourceMaps()
// .version();
