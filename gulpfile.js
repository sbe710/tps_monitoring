let gulp = require('gulp'),
    less = require('gulp-less'),
    prefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    bs = require('browser-sync'),
    rimraf = require('rimraf'),
    path = {
        dist: {
            html: 'dist/',
            js: 'dist/js/',
            css: 'dist/css/',
            img: 'dist/img/',
            fonts: 'dist/fonts/',
        },
        src: {
            html: 'src/template/*.html',
            js: 'src/js/[^_]*.js',
            less: 'src/less/*.less',
            img: 'src/img/*.*',
            fonts: 'src/fonts/**/*.*',
        },
        watch: {
            html: 'src/template/**/*.html',
            js: 'src/js/**/*.js',
            less: 'src/less/**/*.less',
            img: 'src/img/*.*',
            fonts: 'src/fonts/**/*.*',
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
});

gulp.task('html:build', function() {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.dist.html))
        .pipe(bs.stream())
});

gulp.task('less:build', function() {
    return gulp.src(path.src.less)
        .pipe(less())
        .pipe(prefixer({
            browsers: ['last 3 version', "> 1%", "ie 8", "ie 7"]
        }))
        .pipe(gulp.dest(path.dist.css))
        .pipe(bs.stream())
});

gulp.task('js:build', function() {
    gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(gulp.dest(path.dist.js))
        .pipe(bs.stream())
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.dist.fonts))
        .pipe(bs.stream())
});

gulp.task('build', [
    'html:build',
    'js:build',
    'fonts:build',
    'less:build',
]);

gulp.task('clean', function(cb) {
    rimraf(path.clean, cb);
});