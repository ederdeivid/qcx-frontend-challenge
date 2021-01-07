const path = require('path')

module.exports = {
  entry: ['./src/views/LandingPage/Challenge/challenge.js', './index.js'],
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