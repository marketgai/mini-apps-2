const path = require('path');

module.exports = {
  mode      : 'development',
  entry     : path.resolve(__dirname, './client/index.js'),
  module    : {
    rules : [
      {
        test    : /\.(js|jsx)$/,
        exclude : /node_modules/,
        use     : [ 'babel-loader' ]
      }
    ]
  },
  resolve   : {
    extensions : [ '*', '.js', '.jsx' ]
  },
  output    : {
    path     : path.resolve(__dirname, './public'),
    filename : 'bundle.js'
  },
  devServer : {
    contentBase : path.resolve(__dirname, './public')
  }
};
