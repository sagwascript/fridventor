const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	"resolve": {
		"extensions": [".js", ".jsx"]
	},
	"plugins": [new HtmlWebpackPlugin({
		template: './public/index.html',
		filename: 'index.html'
	})]
}