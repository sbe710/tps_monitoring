let gulp = require('gulp'),
    less = require('gulp-less'),
    prefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require("gulp-rename"),
    webpackStream = require('webpack-stream'),
    bs = require('browser-sync'),
    rimraf = require('rimraf'),
    path = {
        dist: {
            html: 'dist/',
            js: 'dist/js/',
            css: 'dist/css/',
            img: 'dist/img/',
        },
        src: {
            html: 'src/template/*.html',
            js: 'src/js/[^_]*.js',
            less: 'src/less/*.less',
            img: 'src/img/*.*',
        },
        watch: {
            html: 'src/template/**/*.html',
            js: 'src/js/**/*.js',
            less: 'src/less/**/*.less',
            img: 'src/img/*.*',
        },
        clean: './dist',
        outputDir: './dist'
    };

gulp.task('server', ['watch'], function() {
    bs.init({
        server: {
            baseDir: path.outputDir,
        },
        notify: false,
    });
});

gulp.task('watch', function() {
    watch([path.watch.html], function() {
        gulp.start('html:build');
    });
    watch([path.watch.less], function() {
        gulp.start('less:build');
    });
    watch([path.watch.js], function() {
        gulp.start('js:build');
    });
    watch([path.watch.img], function() {
        gulp.start('img:build');
    });
});

gulp.task('html:build', function() {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.dist.html))
        .pipe(bs.stream())
});

gulp.task('less:build', function() {
    return gulp.src(path.src.less)
        .pipe(less())
        .pipe(sourcemaps.init())
        .pipe(prefixer({
            browsers: ['last 3 version', "> 1%", "ie 8", "ie 7"]
        }))
        .pipe(plumber())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.dist.css))
        .pipe(bs.stream())
});

gulp.task('js:build', function() {
    gulp.src(path.src.js)
        .pipe(webpackStream({
            output: {
                filename: 'main.js',
            },
            mode: 'development',
            module: {
                rules: [
                    {
                        test: /\.(js)$/,
                        exclude: /(node_modules)/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['env']
                        }
                    }
                ]
            }
        }))
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.dist.js))
        .pipe(bs.stream())
});

gulp.task('img:build', function() {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.dist.img))
        .pipe(bs.stream())
});

gulp.task('build', [
    'html:build',
    'js:build',
    'less:build',
    'img:build'
]);

gulp.task('clean', function(cb) {
    rimraf(path.clean, cb);
});