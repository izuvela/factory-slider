const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");

gulp.task("scss", () => {
  return gulp
    .src("styles/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./styles"));
});

gulp.task("minify-css", () => {
  return gulp
    .src("styles/main.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("dist"));
});

gulp.task("minify-js", () => {
  return gulp
    .src("script.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
});
