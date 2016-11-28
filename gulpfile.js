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
//npm install gulp-util gulp-imagemin gulp-ruby-sass gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload gulp-cache gulp-make-css-url-version gulp-notify gulp-rev-append yargs gulp-replace tiny-lr gulp-changed gulp-less gulp-autoprefixer gulp-clean-css --save-dev

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

/*常用插件
sass的编译（gulp-sass）
less编译 （gulp-less）
重命名（gulp-rename）
自动添加css前缀（gulp-autoprefixer）
压缩css（gulp-clean-css）
js代码校验（gulp-jshint）
合并js文件（gulp-concat）
压缩js代码（gulp-uglify）
压缩图片（gulp-imagemin）
自动刷新页面（gulp-livereload，谷歌浏览器亲测，谷歌浏览器需安装livereload插件）
图片缓存，只有图片替换了才压缩（gulp-cache）
更改提醒（gulp-notify）
*/