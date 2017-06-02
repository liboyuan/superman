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
 *│      ├─dev 线上 备份存档
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
// 安装node
// wget https://nodejs.org/dist/v4.2.4/node-v4.2.4-linux-x64.tar.gz
// tar  -zxvf   node-v4.2.4-linux-x64.tar.gz
// ln -s /home/yangxinglong/node-v0.10.28-linux-x64/bin/node /usr/local/bin/node
// ln -s /home/yangxinglong/node-v0.10.28-linux-x64/bin/npm /usr/local/bin/npm
// 安装gulp
// npm install --global gulp
// npm install --save-dev gulp
// 第一次运行请安装相关插件
// npm install gulp-util gulp-imagemin gulp-ruby-sass gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload gulp-cache gulp-make-css-url-version gulp-notify gulp-rev-append del yargs gulp-autoprefixer tiny-lr --save-dev


// 引入 Gulp插件
var gulp = require('gulp'),
    //rename = require('gulp-rename'), // 重命名文件
    //jshint = require('gulp-jshint'), // JS语法检测
    uglify = require('gulp-uglify'), // JS美化
    //concat = require('gulp-concat'), // JS拼接
    //imagemin = require('gulp-imagemin'), // 图片压缩
    //cache = require('gulp-cache'), // 缓存通知
    minifycss = require('gulp-minify-css'), // 压缩CSS
    //cssver = require('gulp-make-css-url-version'), // css文件引用URL加版本号
    //clean = require('del'), // 清空文件
    //notify = require('gulp-notify'), // 更新通知
    //rev = require('gulp-rev-append'), // html添加版本号
    autoprefixer = require('gulp-autoprefixer'), // 追加私有前缀
    //hun = require('gulp-obfuscate') // 追加私有前缀

// 路径变量
//var date = new Date()
//var arr=[date.getFullYear(),date.getMonth()+1,date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds()]
//var v=""
//for (var i = 0; i < arr.length; i++) {
//    if (arr[i]<10) {arr[i]='0'+arr[i]};
//    v+=arr[i]
//};
//var date = v
var v = "###fe_version###"
var path = {
    // 开发环境
    dev: {
        dev: '../dev/',
        html: '../view/',
        js: '../dev/product/',
        css: '../dev/product/',
        image: '../dev/product/',
        lib:'../dev/lib/',
        common:'../dev/common/',
        framework:'../dev/framework/'
    },
    // 发布环境
    distDev: {
        js: '../dist/' + v + "/dev/product",
        css: '../dist/' + v + "/dev/product",
        image: '../dist/' + v + "/dev/product",
        lib:'../dist/' + v + "/dev/lib",
        common:'../dist/' + v + "/dev/common",
        framework:'../dist/' + v + "/dev/framework"
    },
    distMini: {
        js: '../dist/' + v + "/product",
        css: '../dist/' + v + "/product",
        image: '../dist/' + v + "/product",
        lib:'../dist/' + v + "/lib",
        common:'../dist/' + v + "/common",
        framework:'../dist/' + v + "/framework"
    }
};




// 图片压缩
gulp.task('image',function() {
     gulp.src(path.dev.image + '**/*.{jpg,png,jpeg,ico,gif}')
        .pipe(gulp.dest(path.distDev.image))
        .pipe(gulp.dest(path.distMini.image))
});
// 压缩暂时有问题，之后解决
// 目前只有拷贝功能

// 合并压缩JS文件
gulp.task('script', function() {
     gulp.src(path.dev.js + '**/*.js')//选择所有JS文件
        .pipe(gulp.dest(path.distDev.js))//输出线上备份JS文件
        .pipe(uglify()) // 压缩
        .pipe(gulp.dest(path.distMini.js))//输出线上压缩JS文件
});
// 压缩css
gulp.task('css', function() {
     gulp.src(path.dev.css + '**/*.css')//选择所有CSS文件
        .pipe(gulp.dest(path.distDev.css))//输出线上备份CSS文件
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))//给所有游览器添加私有前缀
        .pipe(minifycss({
            "compatibility": 'ie7'
        }))// 压缩CSS，兼容到IE7
        .pipe(gulp.dest(path.distMini.css));// 输出线上压缩CSS文件
});

gulp.task('framework', function() {
     gulp.src(path.dev.framework + '**/*.css')//选择所有CSS文件
        .pipe(gulp.dest(path.distDev.framework))//输出线上备份CSS文件
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))//给所有游览器添加私有前缀
        .pipe(minifycss({
            "compatibility": 'ie7'
        }))// 压缩CSS，兼容到IE7
        .pipe(gulp.dest(path.distMini.framework));// 输出线上压缩CSS文件
});


//lib以及common替换
gulp.task('lib',function(){
     gulp.src(path.dev.lib+'**/*.*')
    .pipe(gulp.dest(path.distDev.lib))//拷贝新的库
    .pipe(gulp.dest(path.distMini.lib))//拷贝新的库
})
gulp.task('common',function(){
     gulp.src(path.dev.common+'**/*.*')
    .pipe(gulp.dest(path.distDev.common))//拷贝新的库
    .pipe(gulp.dest(path.distMini.common))//拷贝新的库

})

// 默认任务
gulp.task("default", ['script', 'image', 'css','lib','common','framework']);
