const fileinclude = require('gulp-file-include')
const webpack = require('webpack-stream')
const browser = require('browser-sync')
const concat = require('gulp-concat')
const gulp = require('gulp')

const unawalledFolders = ['!./node_modules/**', '!./dist/**', '!./gulpfile.js', '!**/services/**']
const server = browser.create()
const paths = {
  scripts: {
    src: './',
    dest: './dist/'
  }
}

const addWebpack = () => {
  return gulp.src(['**/*', ...unawalledFolders])
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(paths.scripts.dest))
}

const addCss = () => {
  return gulp.src(['**/*.css', ...unawalledFolders])
    .pipe(concat('main.css'))
    .pipe(gulp.dest(paths.scripts.dest))
}

const mainHtml = () => {
  return gulp.src(['./index.html']).pipe((fileinclude({
    prefix: '@@',
    basepath: '@file'
  })))
    .pipe(gulp.dest(paths.scripts.dest))
}

const copyAssets = () => gulp.src(['./src/assets/**']).pipe(gulp.dest(paths.scripts.dest))
const reload = () => server.reload()

const buildAndReaload = () => {
  addWebpack()
  addCss()
  copyAssets()
  mainHtml()
  reload()
}

const init = () => {
  return server.init({
    server: {
      baseDir: paths.scripts.dest
    }
  })
}

const watch = () => {
  return gulp.watch([
    '**/*',
    ...unawalledFolders
  ],
    gulp.series((done) => {
      buildAndReaload()
      done()
    })
  )
}

const startServer = () => {
  init()
  buildAndReaload()
  watch()
}

exports.default = startServer