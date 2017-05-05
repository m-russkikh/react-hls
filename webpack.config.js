var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	devServer: {
		historyApiFallback: {
			index: 'example/index.html'
		}
	},
	entry: [
		'./example/js/app.js'
	],
	output: {
		path: path.join(__dirname, 'example/build'),
		filename: 'bundle.js',
		publicPath: '/build/'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
			}, {
				test: /\.js?/,
				loaders: ['react-hot-loader','babel-loader'],
				include: [
					path.join(__dirname, 'example'),
					/node_modules\/hls\.js/
				]
			}, {
				test: /\.svg$/,
				loaders: [
					'file-loader?name=[path][name].[ext]'
				]
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin('bundle.min.css')
	]
};