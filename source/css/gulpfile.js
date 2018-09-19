var gulp = require('gulp'),
	sass = require('gulp-sass');

var sassConfig = {
	inputDirectory: 'scss/**/*.scss',
	options: {
		outputStyle: 'expanded'
	}
}

gulp.task('scss', function() {
	return gulp
		.src(sassConfig.inputDirectory)
		.pipe(sass(sassConfig.options).on('error', sass.logError))
		.pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
	gulp.watch('scss/**/*.scss', ['scss']);
});

gulp.task('default', ['scss']);
