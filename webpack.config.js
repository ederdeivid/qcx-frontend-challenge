const path = require('path')

module.exports = {
  entry: [
    './src/views/LandingPage/Challenge/mainCard.js',
    './src/views/LandingPage/Challenge/repos.js',
    './src/views/LandingPage/Home/home.js',
    './index.js'
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: ['/node_modules/', '/dist/']
      }
    ]
  }
}