var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/views/main.handlebars',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {

	entry: [
		'./components/app.js'
	],
	output: {
	    path: __dirname + '/public/',
	    filename: "index_bundle.js"
	  },
	  module: {
	    loaders: [
	      {
	      	test: /\.js$/, 
	      	exclude: __dirname + '/node_modules', 
	      	loaders: ["babel-loader"]
	      }
	    ]
	  },
	  plugins: [HTMLWebpackPluginConfig]	
};