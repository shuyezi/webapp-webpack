var webpack = require("webpack");
var webpackConfig = require("./webpack.config");
var webpackDevServer = require("webpack-dev-server");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var port = webpackConfig.port || 8000;
webpackConfig.entry.app.unshift("webpack-dev-server/client?http://localhost:" + port, "webpack/hot/dev-server");

var server = new webpackDevServer(webpack(webpackConfig), {
	publicPath: webpackConfig.output.publicPath,
	hot: true,
	stats: { colors: true },
	quiet: true
});
server.listen(port, 'localhost', function(){
	console.log('App is listening: http://localhost:' + port);
});