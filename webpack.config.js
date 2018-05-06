var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devServer: {
		publicPath: '/dist/',
		contentBase: path.join(__dirname, "example"),
		hot: true
	},
	entry: {
		'react-hls': './example/js/app.js'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].bundle.js',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.css', '.scss']
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
			}, {
				test: /\.js|jsx$/,
				loaders: ['babel-loader'],
				exclude: /node_modules/
			}, {
				test: /\.svg$/,
				loaders: [
					'file-loader?name=[path][name].[ext]'
				]
			}
		]
	},
	performance: {
		hints: false
	},
	plugins: [
		new ExtractTextPlugin('[name].bundle.css'),
		new webpack.HotModuleReplacementPlugin()
	]
};