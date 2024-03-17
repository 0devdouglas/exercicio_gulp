const gulp       = require('gulp');
const sass       = require('gulp-sass')(require('sass'));
const sourceMaps = require('gulp-sourcemaps');
const uglify     = require('gulp-uglify');
const obfuscate  = require('gulp-obfuscate')
const imagemMin  = require('gulp-imagemin')

// Comprime imagens
function compressImage () {
    return gulp.src('./src/images/*')
            .pipe(imagemMin())
            .pipe(gulp.dest('./build/images'))
}

// Comprime JavaScript
function compressJavaScript () {
    return gulp.src('./src/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'))
}

// Comprime e minimifica o SASS
function compileSass() {
    return gulp.src('./src/styles/main.scss')
            .pipe(sourceMaps.init())
            .pipe(sass({
                outputStyle: 'compressed',
            }))
            .pipe(sourceMaps.write('./maps'))
            .pipe(gulp.dest('./build/styles'));
}

exports.default = () => {
    gulp.watch('./src/styles/*.scss', { ignoreInitial: false }, gulp.series(compileSass));
    gulp.watch('./src/images/*', {ignoreInitial: false}, gulp.series(compressJavaScript))
    gulp.watch('./src/scripts/*.js', {ignoreInitial: false}, gulp.series(compressImage))
};

