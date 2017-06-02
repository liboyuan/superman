/*****一期项目结构*****
 *PROJECT
 *│  gulpfile.js gulp任务文件
 *│  package.json 项目信息
 *├─dev 开发环境
 *│  ├─common 公共组件
 *│  ├─lib 依赖库
 *│  └─product 项目
 *│      └─product 项目名称
 *│          ├─css 样式文件
 *│          ├─img 图片文件
 *│          └─js 脚本文件
 *├─dist 线上环境
 *│  └─201512291555 版本->>年月日时分
 *│      ├─dev 线上备份存档
 *│      │  ├─common
 *│      │  ├─lib 
 *│      │  └─product 
 *│      │      └─product
 *│      │          ├─css
 *│      │          ├─img
 *│      │          └─js
 *│      └─mini 线上压缩版本
 *│          ├─common
 *│          ├─lib
 *│          └─product
 *│              └─product
 *│                  ├─css
 *│                  ├─img
 *│                  └─js
 *├─node_modules 组件目录
 *└─view 静态文件
 *******************/


/*****二期项目结构*****
 *PROJECT
 *│  gulpfile.js gulp任务文件
 *│  package.json 项目信息
 *├─dev 开发环境
 *│  ├─common 公共组件
 *│  ├─lib 依赖库
 *│  └─product 项目
 *│      └─product 项目名称
 *│          ├─css 样式文件
 *│          ├─img 图片文件
 *│          └─js 脚本文件
 *├─dist
 *│  └─20151229 版本->>年月日时分
 *│      ├─dev 线上备份存档
 *│      │  ├─common
 *│      │  ├─css
 *│      │  ├─img
 *│      │  ├─js
 *│      │  └─lib
 *│      └─mini 线上压缩版本
 *│          ├─common
 *│          ├─css
 *│          ├─img
 *│          ├─js
 *│          └─lib
 *├─node_modules 组件目录
 *└─view 静态文件
 *******************/

// 第一次运行请安装相关插件
// npm install gulp-util gulp-imagemin gulp-ruby-sass gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload gulp-cache gulp-make-css-url-version gulp-notify gulp-rev-append yargs gulp-replace tiny-lr gulp-changed --save-dev


// 引入 Gulp插件
var gulp = require('gulp'),
    rename = require('gulp-rename'), // 重命名文件
    jshint = require('gulp-jshint'), // JS语法检测
    uglify = require('gulp-uglify'), // JS美化
    concat = require('gulp-concat'), // JS拼接
    imagemin = require('gulp-imagemin'), // 图片压缩
    cache = require('gulp-cache'), // 缓存通知
    minifycss = require('gulp-minify-css'), // 压缩CSS
    cssver = require('gulp-make-css-url-version'), // css文件引用URL加版本号
    clean = require('gulp-clean'), // 清空文件夹
    notify = require('gulp-notify'), // 更新通知
    rev = require('gulp-rev-append'), // html添加版本号
    replace = require('gulp-replace'), // 文件重写
    changed = require('gulp-changed'), // 文件重写
    clean = require("gulp-clean");   //清除无用文件

// 路径变量
var date = new Date()
var year = date.getFullYear()
var month = date.getMonth()
var day = date.getDate()
var minutes = date.getMinutes()
var date = year + month + day + minutes
var path = {
    // 开发环境
    dev: {
        html: './',
        js: './images/**',
        css: './images/**',
        image: './images/**'
    },
    // 发布环境
    distDev: {
        dev: './dist/' + date + "/dev/",
        html: './dist/' + date + '/dev/view',
        js: './dist/' + date + "/dev/",
        css: './dist/' + date + "/dev/",
        image: './dist/' + date + "/dev/"
    },
    distMini: {
        html: './dist/' + date + '/mini/view',
        js: './dist/' + date + "/mini/js/",
        css: './dist/' + date + "/mini/css/",
        image: './dist/' + date + "/mini/image/"
    }
};

// 图片压缩
gulp.task('image', function() {
    gulp.src(path.dev.image + '/*.*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest(path.distMini.image));
    //.pipe(notify({ message: '图片压缩'}));
});

// 合并压缩JS文件
gulp.task('script', function() {
    gulp.src(path.dev.js + '/*.js')
        //.pipe(concat('all.js'))            // 合并
        //.pipe(gulp.dest(path.dist.js))
        .pipe(gulp.dest(path.distDev.js))
        .pipe(rename({
            suffix: '.min'
        })) // 重命名

        .pipe(uglify()) // 压缩
        .pipe(gulp.dest(path.distMini.js))
        //.pipe(notify({ message: 'JS合并压缩' }))
});
// 压缩css
gulp.task('css', function() {
    gulp.src(path.dev.css + '/*.css')
     .pipe(replace('.jpg', '.jpg?='+date))
     .pipe(replace('.png', '.png?='+date))
     .pipe(replace('.gif', '.gif?='+date))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss({
            "compatibility": 'ie7'
        }))
        .pipe(gulp.dest(path.distMini.css))
});

// html改变调用地址



// 默认任务
gulp.task("default", ['script', 'image', 'css']);