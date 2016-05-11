var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var fs = require("fs");
var env = process.env.NODE_ENV == undefined ? 'debug' : process.env.NODE_ENV.trim();

/*
 * @name Plugins
 */
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var AssetsWebpackPlugin = require('assets-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

/*
 * @name Output Configs
 */
var options = {};
options = {
	releaseDir: '',
	plugins: [],
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				loaders: ['babel-loader?presets[]=es2015&presets[]=react']
		    },
		    {
		    	test: /\.(jpe?g|png|gif|svg)$/i,
		    	loaders: [
		    		'file?hash=sha512&digest=hex&name=images/[name].[hash].[ext]',
		    		'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
		    	]
		    },
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract('css?source-map!less?source-map!autoprefixer?browsers=last 2 versions')
			}
		]
	},
	output: {
		path: path.join(__dirname, options.releaseDir + 'assets/'),
		publicPath: '/assets/',
		filename: 'app.js'
	}
}
console.log('来了...');
switch(env){
	case 'debug':
		options.releaseDir = 'release_debug/';
		options.output.path = path.join(__dirname, options.releaseDir + 'assets/');

		options.plugins = [
			new CleanWebpackPlugin([options.releaseDir]),
			new ExtractTextPlugin('app.css'),
			new webpack.optimize.CommonsChunkPlugin('libs', 'libs.js'),
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoErrorsPlugin()
		];

		options.devtool = 'source-map';
		options.module.loaders[0].loaders.unshift('react-hot');
		break;
	case 'test':
		options.releaseDir = 'release_test/';
		options.output.path = path.join(__dirname, options.releaseDir + 'assets/');

		options.plugins = [
			new CleanWebpackPlugin([options.releaseDir]),
			new ExtractTextPlugin('app-[hash].css'),
			new webpack.optimize.CommonsChunkPlugin('libs', 'libs-[hash].js'),
			new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
			new AssetsWebpackPlugin({ filename: './assets.json'}),
			function() { this.plugin("done", setIndexHtml); }
		];

		options.output.filename = 'app-[hash].js';
		break;
	case 'production':
		options.releaseDir = 'release/';
		options.output.path = path.join(__dirname, options.releaseDir + 'assets/');

		options.plugins = [
			new CleanWebpackPlugin([options.releaseDir]),
			new ExtractTextPlugin('app-[hash].css'),
			new webpack.optimize.CommonsChunkPlugin('libs', 'libs-[hash].js'),
			new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
			new AssetsWebpackPlugin({ filename: './assets.json'}),
			function() { this.plugin("done", setIndexHtml); }
		];

		options.output.filename = 'app-[hash].js';
		break;
}

/*
 * @name Helper Functions
 */

// @name 获取SRC列表
// @param listSrc {String} 文件路径列表
// @param addon {Array} 附加的列表数组
var getList = function(listSrc, addon){
	var list = glob.sync(listSrc);
	return (addon && typeof addon == 'object' && !!addon.length) ? list.concat(addon) : list;
}

// @name index.html文件拷贝&预处理
var setIndexHtml = function(){
	var htmlString = fs.readFileSync('./index.html').toString();
	var assetsJson = JSON.parse(fs.readFileSync('./assets.json').toString());
	['app.js', 'libs.js', 'app.css', 'libs.css'].map(function(item){
		var _name = item.split(".")[0], _ext = item.split(".")[1];
		htmlString = htmlString.replace('/assets/' + item, assetsJson[_name][_ext]);
	});
	fs.writeFile(options.releaseDir + 'index.html', htmlString, function(){
		fs.unlinkSync('./assets.json');
	});
}

/*
 * @name Main
 */
module.exports = {
	port: 7777,
	entry: {
		app: ['./app/index.js'],
		libs: getList('./app/libs/js/*.js', ['react', 'react-dom', 'react-router', 'antd'])
	},
	output: options.output,
	module: options.module,
	plugins: options.plugins,
	resolve: {
		root: path.join(__dirname, 'app'),
		extensions: ['', '.js', '.jsx', '.json', '.css', '.less']
	}
}