// 1安装node
// 2安装gulp
//      npm install --global gulp
//      npm install --save-dev gulp
// 3第一次运行请安装相关插件
// npm install gulp-minify-css gulp-uglify gulp-autoprefixer  gulp-replace --save-dev

var gulp = require('gulp'),
    uglify = require('gulp-uglify'), // JS美化
    minifycss = require('gulp-minify-css'), // 压缩CSS
    autoprefixer = require('gulp-autoprefixer'); // 追加私有前缀
    replace = require('gulp-replace') // 字符串替换
// ###fe_version###  ###fe_product###
var v = "###fe_version###";
var product = "###fe_product###";
var path = {
    // 项目开发环境
    dev: {
        js: '../' + product + '/project/',
        css: '../' + product + '/project/',
        image: '../' + product + '/project/',
        common: '../' + product + '/common/',
        lib: '../common/'
    },
    // 项目备份
    distDev: {
        js: '../dist/dev/' + product + '/project',
        css: '../dist/dev/' + product + '/project',
        image: '../dist/dev/' + product + '/project',
        common: '../dist/dev/' + product + '/common',
        lib: '../dist/dev/common'
    },
    // 项目压缩
    distMini: {
        js: '../dist/' + v + '/' + product + '/project',
        css: '../dist/' + v + '/' + product + '/project',
        image: '../dist/' + v + '/' + product + '/project',
        common: '../dist/' + v + '/' + product + '/common',
        lib: '../dist/' + v + '/common'
    }
};
//项目图片
gulp.task('image', function() {
    gulp.src(path.dev.image + '**/*.{jpg,png,jpeg,ico,gif}') //选择所有img文件
        .pipe(gulp.dest(path.distDev.image)) //输出线上备份img文件
        .pipe(gulp.dest(path.distMini.image)); //输出压缩备份img文件
});


//项目压缩js
gulp.task('script', function() {
    gulp.src(path.dev.js + '**/*.js') //选择所有JS文件
        .pipe(gulp.dest(path.distDev.js)) //输出线上备份JS文件
        .pipe(uglify()) // 压缩
        .on('error', function(err) {
            console.log('Error!', err.message);
            process.exit(1);
        })
        .pipe(gulp.dest(path.distMini.js)); //输出线上压缩JS文件
});


// 项目压缩css
gulp.task('css', function() {
    gulp.src(path.dev.css + '**/*.css') //选择所有CSS文件
        .pipe(gulp.dest(path.distDev.css)) //输出线上备份CSS文件
        .pipe(autoprefixer({
            browsers: ['last 3 versions', 'ios 6', 'android 4'],
        })) //给所有游览器添加私有前缀
        .on('error', function(err) {
            console.log('Error!', err.message);
            process.exit(1);
        })
        .pipe(minifycss({
            compatibility: 'ie7',
        })) // 压缩CSS，兼容到IE7
        .on('error', function(err) {
            console.log('Error!', err.message);
            process.exit(1);
        })
        .pipe(replace('(/', '('))
        .pipe(gulp.dest(path.distMini.css)); // 输出线上压缩CSS文件
});

//项目common
gulp.task('common', function() {
    gulp.src(path.dev.common + '**/*.*')
        .pipe(gulp.dest(path.distDev.common));
         //拷贝所有文件输出到线上备份

});
gulp.task('common_other', function() {
    gulp.src([path.dev.common + '**/*.*', '!' + path.dev.common + '**/*.js'])
        .pipe(gulp.dest(path.distMini.common)); //输出除了js文件的其他文件到线上压缩

});
gulp.task('common_js', function() {
    gulp.src(path.dev.common + '**/*.js')
        .pipe(uglify()) // 压缩
        .on('error', function(err) {
            console.log('Error!', err.message);
            process.exit(1);
        })
        .pipe(gulp.dest(path.distMini.common)); //输出线上压缩common中JS文件
});

//公用common
gulp.task('lib', function() {
    gulp.src(path.dev.lib + '**/*.*')
        .pipe(gulp.dest(path.distDev.lib)) //输出线上备份文件
        .pipe(gulp.dest(path.distMini.lib)); //拷贝新的库输出线上文件
});


// 默认任务
gulp.task("default", ['image', 'script', 'css', 'common', 'common_other', 'common_js', 'lib']);
