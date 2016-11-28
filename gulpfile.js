/***目录结构****
*project
*├─gulpfile.js   gulp任务文件
*├─package.json  项目信息  
*├─dev           开发环境
*│  ├─common     插件库
*│  └─lib        依赖文件库
*│  
*├─dist          线上环境
*│  └─

*/
//第一次运行请安装相关插件
//npm install gulp-util gulp-imagemin gulp-ruby-sass gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload gulp-cache gulp-make-css-url-version gulp-notify gulp-rev-append yargs gulp-replace tiny-lr gulp-changed --save-dev

var gulp = require('gulp'); 

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('lint', function() {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
    gulp.src('./js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});


gulp.task('default', function(){
    gulp.start('lint','scripts');
    gulp.watch('./js/*.js', function(){
        gulp.run('lint','scripts');
    });
});