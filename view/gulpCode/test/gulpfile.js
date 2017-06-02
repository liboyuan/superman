// 初次运行安装环境
// npm install gulp del gulp-coffee gulp-sourcemaps gulp-less gulp-autoprefixer fs gulp-imagemin gulp-rename gulp-uglify gulp-cache gulp-replace gulp-minify-css  --save-dev
var gulp = require('gulp'),
    less = require('gulp-less'),
    http = require('http'),
    browserSync = require('browser-sync');




gulp.task('zhishangless', function () {
    gulp.src(__dirname + '/../' + '/git/fe/**/*.less')
        .pipe(less())
        .on('error', function (err) {
            console.log('Error!', err.message);
            this.end();
        })
        .pipe(gulp.dest(__dirname + '/../' + '/git/fe/'));
});

gulp.task('lvyouless', function () {
    gulp.src(__dirname + '/../' + '/git/lyfe/**/*.less')
        .pipe(less())
        .on('error', function (err) {
            console.log('Error!', err.message);
            this.end();
        })
        .pipe(gulp.dest(__dirname + '/../' + '/git/lyfe/'));
});






gulp.task('zhishang', function () {
    gulp.watch(__dirname + '/../git/fe/dev/**/*.css', function (event) {
        gulp.src(event.path)
            .pipe(less())
            .on('error', function (err) {
                console.log('Error!', err.message);
                this.end();
            })
            .pipe(gulp.dest(event.path.substr(0, event.path.lastIndexOf('/') + 1)));
    });


    browserSync.init({
        files: [
            '../git/fe/**/*.html',
            '../git/fe/**/*.css',
            '../git/fe/**/*.js',
            '../git/fe/**/img/**'
        ],
        proxy: "http://liboyuan.51zhishang-d.com"
    });


});


gulp.task('lvyou', function () {
    gulp.watch(__dirname + '/../git/lyfe/dev/**/*.less', function (event) {

        gulp.src(event.path)
            .pipe(less())
            .on('error', function (err) {
                console.log('Error!', err.message);
                this.end();
            })
            .pipe(gulp.dest(event.path.substr(0, event.path.lastIndexOf('/') + 1)));

    });
    browserSync.init({
        files: [
            '../git/lyfe/**/*.html',
            '../git/lyfe/**/*.css',
            '../git/lyfe/**/*.js',
            '../git/lyfe/**/img/**'
        ],
        proxy: "http://liboyuan.cntedu-d.com"

    });

});







// 默认任务
gulp.task("default", ['zhishang']);