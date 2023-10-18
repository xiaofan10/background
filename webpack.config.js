import path from 'path'
import { fileURLToPath } from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import { VueLoaderPlugin } from 'vue-loader'

export default {
	entry: {
		main: './src/main.js',
	},
	output: {
		filename: 'background.js',
		path: path.resolve(__dirname, 'dist'),
	},
	optimization: {
		minimize: false, // 禁用代码压缩
	},
	resolve: {
		extensions: ['.js', '.vue'], // 添加或修改需要解析的文件扩展名
		fullySpecified: false, // 采用esm加载需要关闭它，不然必须直径文件扩展名
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
				resolve: {
					fullySpecified: false, // disable the behaviour
				},
			},
			{
				test: /\.(css|less)$/,
				use: [
					'style-loader', // 将编译后的 CSS 添加到页面中的 style 标签
					'css-loader', // 解析 CSS 文件
					'less-loader', // 编译 Less 文件为 CSS
				],
			},
		],
	},
	plugins: [
		new ESLintPlugin({
			extensions: ['.js', '.vue'],
		}),
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: 'index.html',
		}),
	],
	devServer: {
		port: 9999, // 指定端口
		hot: true, // 启用模块热替换 (HMR)
	},
}
