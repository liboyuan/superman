
// 初次运行安装环境
// npm install gulp del gulp-coffee gulp-sourcemaps gulp-less gulp-autoprefixer fs gulp-imagemin gulp-rename gulp-uglify gulp-cache gulp-replace gulp-minify-css  --save-dev
var gulp = require('gulp'),
    del = require('del'),
    coffee = require('gulp-coffee'),
    sourcemaps = require('gulp-sourcemaps'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    fs = require('fs'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    cache = require('gulp-cache'),
    replace = require('gulp-replace'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    livereload = require('gulp-livereload'),
    config = require('./config.js'),
    http = require('http'),
    st = require('st'),
    obfuscate = require('gulp-obfuscate'),
    browserSync = require('browser-sync');
var path = {
    develop: {
        img: config.dev + '/**',
        script: config.dev + '/**',
        css: config.dev + '/**',
        html: config.dev + '/**'
    },
    dev: {
        img: './dev/' + config.dev + '/**',
        script: './dev/' + config.dev + '/**',
        css: './dev/' + config.dev + '/**',
        html: './dev/' + config.dev + '/**'
    },
    distDev: {
        img: './dist/dev/product/temp_space/' + config.dist + '/',
        script: './dist/dev/product/temp_space/' + config.dist + '/',
        css: './dist/dev/product/temp_space/' + config.dist + '/',
        html: './dist/view/temp_space/' + config.dist + '/'
    },
    distUrl: {
        img: 'imgs/',
        cssImg: '../imgs/',
        script: 'script/',
        css: 'style/',
        name: 'http://' + config.author + '.51zhishang-d.com/',
    },
    distReUrl: {
        img: '/dev/product/temp_space/' + config.dist + '/imgs/',
        script: '/dev/product/temp_space/' + config.dist + '/script/',
        css: '/dev/product/temp_space/' + config.dist + '/style/',
        name: '/',
    }
};

gulp.task('jiami', function() {
    return gulp.src('test.js')
        .pipe(obfuscate())
        .pipe(gulp.dest('test_.js'))
})

gulp.task('coffee', function() {
    gulp.src(path.develop.script + '/*.coffee')
        .pipe(coffee({
            bare: true
        }))
        .on('error', function(err) {
            console.log('Error!', err.message);
            this.end();
        })
        .pipe(gulp.dest('../dev/' + config.dist + ''))
        .pipe(livereload());
});


// gulp.task('less', function() {
//     gulp.src(path.develop.css + '/*.less')
//         .pipe(less())
//         .on('error', function(err) {
//             console.log('Error!', err.message);
//             this.end();
//         })
//         .pipe(gulp.dest('./dev/' + config.dist + '/'))
//         .pipe(livereload());
// });

gulp.task('less', function() {
    gulp.src(config.dist + '/**/*.less')
        .pipe(less())
        .on('error', function(err) {
            console.log('Error!', err.message);
            this.end();
        })
        .pipe(gulp.dest(config.dist + '/'))
        .pipe(livereload());
});



gulp.task('htmlCopy', function() {
    gulp.src(path.develop.html + '/*.html')
        .pipe(gulp.dest('./dev/' + config.dist + '/'))
        .pipe(livereload());
});

gulp.task('imgCopy', function() {
    gulp.src(path.develop.img + '/*.{jpg,png,jpeg,ico,gif}')
        .pipe(gulp.dest('./dev/' + config.dist + '/'))
        .pipe(livereload());
});

gulp.task('scriptCopy', function() {
    gulp.src(path.develop.script + '/*.js')
        .pipe(gulp.dest('./dev/' + config.dist + '/'))
        .pipe(livereload());
});


// 图片压缩
gulp.task('image', function() {
    gulp.src(path.dev.img + '/*.{jpg,png,jpeg,ico,gif}')
        .pipe(imagemin())
        .pipe(gulp.dest(path.distDev.img));
});

gulp.task('script', function() {

    gulp.src(path.dev.script + '/*.js') //选择所有JS文件
        //.pipe(uglify()) // 压缩
        .pipe(gulp.dest(path.distDev.script)); //输出线上压缩JS文件
});


gulp.task('css', function() {
    gulp.src(path.dev.css + '/*.css') //选择所有CSS文件
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(replace('./' + path.dev.img, path.distReUrl.img))
        .pipe(replace(path.distUrl.cssImg, path.distReUrl.img))
        .pipe(gulp.dest(path.distDev.css)); // 输出线上压缩CSS文件

});

gulp.task('html', function() {
    gulp.src(path.dev.html + '/*.html')
        .pipe(replace(path.distUrl.img, path.distReUrl.img))
        .pipe(replace(path.distUrl.script, path.distReUrl.script))
        .pipe(replace(path.distUrl.css, path.distReUrl.css))
        .pipe(replace(path.distUrl.name, path.distReUrl.name))
        .pipe(gulp.dest(path.distDev.html));
});



gulp.task('livereload', function() {
    gulp.src(config.dist + '/view/**/*.html')
        .pipe(livereload())

});


gulp.task('watch', function() {
    gulp.watch(__dirname + '/' + config.dist + '/**/*.less', ['less']);
    browserSync({
        files: [
            config.dist + '/**/*.html',
            config.dist + '/**/*.css',
            config.dist + '/**/*.js',
            config.dist + '/**/img/**'
        ],
        server: {
            baseDir: config.dist + '/'
        }
    });
});


// gulp.task('watch', ['server'], function() {
//     livereload.listen();
//     // livereload.listen({
//     //     port: 3000,
//     //     basePath:__dirname+ './dev/' ,
//     //     start: 'index.html'
//     // });

//     gulp.watch( __dirname + '/'+config.dist+'/**/*.{less}',['less']);
//     gulp.watch( __dirname + '/'+config.dist+'/**/*.{html}',['livereload']);

//     //gulp.watch('./' + config.dev + '/**', ['coffee']);
//     //gulp.watch('./' + config.dev + '/**', ['less', 'scriptCopy', 'htmlCopy','imgCopy']);
// });

gulp.task('clear', function() {
    del(['./dist/', './dev/']);
});

gulp.task('server', function() {
    http.createServer(
        st({
            path: __dirname + '/' + config.dist,
            index: 'index.html',
            cache: false
        })
    ).listen(3000);
});


// 默认任务
gulp.task("default", ['image', 'script', 'css', 'html']);