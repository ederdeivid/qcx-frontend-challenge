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
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(paths.scripts.dest))
}

const addCss = () => {
  return gulp.src(['**/*.css', ...unawalledFolders])
    .pipe(concat('main.css'))
    .pipe(gulp.dest(paths.scripts.dest))
}

const addHtml = () => {
  return gulp.src(['index.html']).pipe((fileinclude({
    prefix: '@@',
    basepath: '@file'
  })))
    .pipe(gulp.dest(paths.scripts.dest))
}

// const addJs = async () => {
//   return gulp.src(['**/*.js', ...unawalledFolders])
//     .pipe(concat('index.js'))
//     .pipe(gulp.dest(paths.scripts.dest))
// }

const includeHTML = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      addHtml()
      addWebpack()
      addCss()
      // await addJs()
      resolve()
    } catch (err) {
      console.error(err)
      reject(err)
    }
  })
}

const reload = () => server.reload()
const copyAssets = () => gulp.src(['./src/assets/**']).pipe(gulp.dest(paths.scripts.dest))

const buildAndReload = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      includeHTML()
      // addWebpack()
      copyAssets()
      reload()
    } catch (err) {
      console.error(err)
      reject(err)
    } finally {
    }
  })
}

const startServer = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      server.init({
        server: {
          baseDir: paths.scripts.dest
        }
      })
      buildAndReload()
      gulp.watch(
        ['**/*', ...unawalledFolders],
        gulp.series((done) => {
          buildAndReload()
          done()
        })
      )
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

exports.default = startServer
// exports.includeHTML = includeHTML
