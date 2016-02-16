"use strict";

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    inject = require('gulp-inject'),
    spritesmith = require('gulp.spritesmith');

var path = {
    build: {
        html: 'build/_html',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/templates/*.html',
        js: 'src/js/script.js',
        style: 'src/css/style.less',
        img: 'src/img/*.*',
        sprite: 'src/img/ico/*.*',
        fonts: 'src/fonts/**/*.*',
        svg: 'src/img/svg/*.svg',
        svg_html: 'src/templates/svg_template/svg.html',
        svg_dest: 'src/templates/blocks/'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/css/**/*.less',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        svg: 'src/img/svg/*.svg',
        sprite: 'src/img/ico/*.*'
    }
};

var config = {
    server: {
        baseDir: "./",
        directory: true
    },
    host: "localhost",
    port: 9000,
    startPath: "/build/_html",
    tunnel: null,
    ui: false,
    online: true,
    notify: false,
    timestamps: false,
    ghostMode: false,
    logFileChanges: false,
    logSnippet: false,
    logPrefix: "nikalun"
};


gulp.task('sprite', function() {
    var spriteData =
        gulp.src(path.src.sprite)
            .pipe(spritesmith({
                imgName: 'sprite.png',
                imgPath: '../img/sprite/sprite.png',
                cssName: 'sprite.less',
                cssFormat: 'less',
                algorithm: 'binary-tree',
                cssVarMap: function(sprite) {
                    sprite.name = sprite.name
                }
            }));

    spriteData.img.pipe(gulp.dest('./build/img/sprite'));
    spriteData.css.pipe(gulp.dest('./src/css/parts')); // путь, куда сохраняем стили
});


gulp.task('svgstore', function () {
    var svgs = gulp
        .src(path.src.svg)
        .pipe(svgmin())
        .pipe(svgstore({ inlineSvg: true }));

    function fileContents (filePath, file) {
        return file.contents.toString();
    }

    return gulp
        .src(path.src.svg_html)
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest(path.src.svg_dest));
});

gulp.task('webserver', function () {
    browserSync(config);
});


gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(rigger())
     //   .pipe(uglify())
        .pipe(gulp.dest(path.build.js));
});

gulp.task('css:build', function () {
    gulp.src(path.src.style)
        .pipe(plumber())
        .pipe(less({
            paths: ['src/css/'],
            compress: true
        }))
       // .pipe(cssmin())
        .pipe(gulp.dest(path.build.css));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img));
});

gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('build', [
    'html:build',
    'js:build',
    'css:build',
    'fonts:build',
    'image:build'
]);


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.svg], function(event, cb) {
        gulp.start('svgstore');
    });
    watch([path.watch.sprite], function(event, cb) {
        gulp.start('sprite');
    });
});


gulp.task('default', ['svgstore', 'build', 'webserver', 'watch', 'sprite']);