var gulp = require('gulp'),
    borwserSync = require('browser-sync').create(), //浏览器同步刷新
    reload = borwserSync.reload,
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    sequence = require('gulp-sequence'); //执行顺序
    autoprefixer = require('gulp-autoprefixer'), 
    uglify = require('gulp-uglify'), //压缩JS
    imagemin = require('gulp-imagemin'), //图片压缩
    concat = require('gulp-concat'), //合并
    htmlmin = require('gulp-htmlmin'), //压缩html
	minifycss = require('gulp-minify-css'), //压缩CSS
	rev = require('gulp-rev-append');
	//jshint = require('gulp-jshint'), //代码风格检查
    //obfuscate = require('gulp-obfuscate'); //混肴

//项目路径
var dir = {
	source: './develop2', //源码目录
	produce: './src' //发布目录	
}

//监听浏览器同步刷新
gulp.task('dev', ['sass'], function() {
    borwserSync.init({
        server:{
            baseDir:'./'
        }
    });

    gulp.watch(dir.source + '/**/*.scss', ['sass']);
    gulp.watch([dir.source + '/**/*.html', dir.source + '/**/*.js', dir.source + '/**/*.css']).on('change', reload);
});

/*--------------------------------------------------------------------------------------
 | 公共目录
 |--------------------------------------------------------------------------------------
 */
//压缩CSS
gulp.task('publicCssMin', function () {
    gulp.src([dir.source + '/assets/css/**/*.css'])
    .pipe(minifycss())
    .pipe(gulp.dest(dir.produce + '/assets/css'));
});

//压缩JS
gulp.task('publicJsMin', function () {
    gulp.src([dir.source + '/assets/js/**/*.js'])
    .pipe(uglify())  //使用uglify进行压缩
    .pipe(gulp.dest(dir.produce + '/assets/js')); //压缩后的路径
});

//压缩图片
gulp.task('imagesmin', function() {
	gulp.src(dir.source + '/assets/images/**/*.{jpg,png,gif,svg}')
	.pipe(imagemin({
        optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化         
    }))
	.pipe(gulp.dest(dir.produce + '/assets/images'));
});

/*--------------------------------------------------------------------------------------
 | 模板目录
 |--------------------------------------------------------------------------------------
 */
//压缩HTML
gulp.task('htmlmin', function() {
     var options = {
         removeComments: true, //清除HTML注释
         collapseWhitespace: true, //压缩HTML
         minfyJS: true, //压缩JS
         minfyCss: true, //压缩CSS
     };

     gulp.src([dir.source + '/**/*.html'])
     .pipe(htmlmin(options))
	 .pipe(rev())
     .pipe(gulp.dest(dir.produce));
});

//编译sass
gulp.task('sass', function() {
    return gulp.src(dir.source + '/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest(dir.source));
});

//编译CSS自动加浏览器兼容前缀
gulp.task('autoprefixer', function () {
    gulp.src(dir.source + '/**/*.css')
        .pipe(autoprefixer({
            browsers: [
                'ie >= 9',
                'ie_mob >= 10',
                'ff >= 30',
                'chrome >= 34',
                'safari >= 7',
                'opera >= 23',
                'ios >= 7',
                'android >= 2.3',
                'bb >= 10'
            ],
            cascade: true, //是否美化属性值 默认：true
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(gulp.dest(dir.source))
        .pipe(reload({stream: true}));
});

//压缩CSS
gulp.task('cssmin', function () {
    gulp.src([dir.source + '/**/*.css'])
	.pipe(minifycss())
    .pipe(gulp.dest(dir.produce))
	//.pipe(notify({message: '压缩完成'}));
});

//压缩JS
gulp.task('jsmin', function () {
    gulp.src([dir.source + '/**/*.js'])
	//.pipe(jshint())
    //.pipe(concat('all.js'))	//合并所有js到all.js
    .pipe(uglify())  //使用uglify进行压缩
    .pipe(gulp.dest(dir.produce));
});

//执行顺序
gulp.task('executionSequence', sequence('htmlmin', 'cssmin', 'publicCssMin', 'jsmin'/*, 'imagesmin'*/, 'publicJsMin'));

//压缩HTML、CSS、JS发布版本
gulp.task('build', ['executionSequence']);

