'use strict';

import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

gulp.task('images', () => {
	const imageminOptions = {
		progressive: true,
		interlaced: true,
		svgoPlugins: [
			{removeViewBox: false},
			{cleanupIDs: false}
		]
	};

	return gulp.src('dev/img/*.+(png|jpg|jpeg|svg|gif)')
		.pipe($.cache($.imagemin(imageminOptions)))
		.pipe(gulp.dest('build/dev/img'));
});

gulp.task('styles:vendor', () => {
	return gulp.src([
			'vendor/css/normalize.css',
			'vendor/css/col.css',
			'vendor/css/12cols.css',
			'vendor/css/ionicons.min.css',
			'vendor/css/animate.css'
		])
		.pipe($.concat('vendor.min.css'))
		.pipe($.cssnano())
		.pipe(gulp.dest('build/css'));
});

gulp.task('styles:dev', () => {
	return gulp.src('dev/css/style.css')
		.pipe($.cssnano())
		.pipe(gulp.dest('build/css'));
});




gulp.task('useref', () => {
	const htmlminOptions = {
		removeComments: true,
		collapseWhitespace: true,
		collapseBooleanAttributes: true,
		removeAttributeQuotes: true,
		removeRedundantAttributes: true,
		removeEmptyAttributes: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true,
		removeOptionalTags: true
	};

	const uncssOptions = {
		html: [
			'./index.html'
		],
		// CSS Selectors for UnCSS to ignore
		ignore: []
	};

	return gulp.src('*.html')
		.pipe($.useref())
		// Remove any unused CSS
		.pipe($.if('*.css', $.uncss(uncssOptions)))

		// Concatenate and minify styles
		// In case you are still using useref build blocks
		.pipe($.if('*.css', $.cssnano()))

		// Minify HTML
		.pipe($.if('*.html', $.htmlmin(htmlminOptions)))

		.pipe($.if('*.js', $.uglify()))
		.pipe(gulp.dest('build'));
});

gulp.task('clean', () => del(['build/*', '!.git'], {dot: true}));

gulp.task('build', ['images', 'useref']);
gulp.task('default', ['clean'], () => {
    runSequence(
       ['images', 'useref']
    );
});

