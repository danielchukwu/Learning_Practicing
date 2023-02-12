const path = require('path');

module.exports = {
   mode: 'development',
   entry: './src/index.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'my_bundle.js'
   },
   watch: true
};