const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	entry: {
		main: './src/index.js',
	},
	output: {
		filename: 'background.js',
		path: path.resolve(__dirname, 'dist'),
	},
	optimization: {
		minimize: false, // 禁用代码压缩
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.less$/,
				use: [
					'style-loader', // 将编译后的 CSS 添加到页面中的 style 标签
					'css-loader', // 解析 CSS 文件
					'less-loader', // 编译 Less 文件为 CSS
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html',
		}),
	],
}
