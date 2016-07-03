var gulp = require('gulp'),
    gulpWatch = require('gulp-watch'),
    del = require('del'),
    runSequence = require('run-sequence'),
    argv = process.argv;


/**
 * Ionic hooks
 * Add ':before' or ':after' to any Ionic project command name to run the specified
 * tasks before or after the command.
 */
gulp.task('serve:before', ['watch']);
gulp.task('emulate:before', ['build']);
gulp.task('deploy:before', ['build']);
gulp.task('build:before', ['build']);

// we want to 'watch' when livereloading
var shouldWatch = argv.indexOf('-l') > -1 || argv.indexOf('--livereload') > -1;
gulp.task('run:before', [shouldWatch ? 'watch' : 'build']);

/**
 * Ionic Gulp tasks, for more information on each see
 * https://github.com/driftyco/ionic-gulp-tasks
 *
 * Using these will allow you to stay up to date if the default Ionic 2 build
 * changes, but you are of course welcome (and encouraged) to customize your
 * build however you see fit.
 */
var buildBrowserify = require('ionic-gulp-browserify-typescript');
var buildSass = require('ionic-gulp-sass-build');
var copyHTML = require('ionic-gulp-html-copy');
var copyFonts = require('ionic-gulp-fonts-copy');
var copyScripts = require('ionic-gulp-scripts-copy');

var isRelease = argv.indexOf('--release') > -1;

gulp.task('watch', ['clean'], function (done) {
    runSequence(
        ['sass', 'html', 'fonts', 'scripts', 'service-worker-copy-toolbox'],
        function () {
            gulpWatch('app/**/*.scss', function () {
                gulp.start('sass');
            });
            gulpWatch('app/**/*.html', function () {
                gulp.start('html');
            });
            buildBrowserify({watch: true})
                .on('end', function () {
                    gulp.start('generate-service-worker');
                    done();
                })

            ;
        }
    )
    ;
});

gulp.task('build', ['clean'], function (done) {
    runSequence(
        ['sass', 'html', 'fonts', 'scripts', 'service-worker-copy-toolbox'],
        'generate-service-worker',
        function () {
            buildBrowserify({
                minify: isRelease,
                browserifyOptions: {
                    debug: !isRelease
                },
                uglifyOptions: {
                    mangle: false
                }
            })
                .on('end', function () {
                    gulp.start('generate-service-worker');
                    done();
                })


        }
    );
});

gulp.task('sass', buildSass);
gulp.task('html', copyHTML);
gulp.task('fonts', copyFonts);
gulp.task('scripts', copyScripts);
gulp.task('clean', function () {
    return del('www/build');
});


/*CUSTOM PART*/
var generateServiceWorker = function (done) {
    var swPrecacheFileName = 'sw.js';
    gulpWatch('www/**/!(' + swPrecacheFileName + '|sw.js)', function () {
        gulp.start('generate-service-worker');
    });

    var path = require('path');
    var swPrecache = require('sw-precache');
    var rootDir = "./www";


    /**
     * Service Worker Configuration. This bad boy is all the settings we need
     * */
    swPrecache.write(path.join(rootDir, swPrecacheFileName), {
        staticFileGlobs: [rootDir + '/build/**/*', rootDir + '/index.html'],
        stripPrefix: rootDir,
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        ignoreUrlParametersMatching: [/^utm_/, /^v$/, /^ser$/],
        //for our firebase (assets) caching and firebase API calls
        runtimeCaching: [
            {
                urlPattern: /.*\.firebaseio\.com/,
                handler: 'networkFirst'
            }
            /*,
            {
                urlPattern: /\/articles\//,
                handler: 'fastest',
                options: {
                    cache: {
                        maxEntries: 10,
                        name: 'articles-cache'
                    }
                }
            }*/]
    }, done);
};


gulp.task('generate-service-worker', generateServiceWorker);


var serviceWorkerCopyToolbox = function () {
    options = {};
    options.src =
        [
            'node_modules/sw-toolbox/sw-toolbox.js'
        ];
    options.dest = 'www/build/js';
    return gulp.src(options.src)
        .pipe(gulp.dest(options.dest));
};
gulp.task('service-worker-copy-toolbox', serviceWorkerCopyToolbox);
