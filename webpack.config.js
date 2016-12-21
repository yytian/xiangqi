try {
  require('os').networkInterfaces();
} catch (e) {
  require('os').networkInterfaces = () => ({});
}

const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
	'react-hot-loader/patch',
	// activate HMR for React
	'webpack-dev-server/client?http://localhost:8080',
	// bundle the client for webpack-dev-server
	// and connect to the provided endpoint
	'webpack/hot/only-dev-server',
	// bundle the client for hot reloading
	// only- means to only hot reload for successful updates
	'./index.js'
	// the entry point of our app
    ],
    output: {
	filename: 'app.bundle.js',
	// the output bundle
	path: resolve(__dirname, 'bin'),
	publicPath: '/'
	// necessary for HMR to know where to load the hot update chunks
    },
    context: resolve(__dirname, 'src'),
    devtool: 'inline-source-map',
    devServer: {
	hot: true,
	// activate hot reloading
	contentBase: resolve(__dirname, 'bin'),
	// match the output path
	publicPath: '/'
	// match the output `publicPath`
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loaders: ['style-loader', 'css-loader']
            },
            { test: /\.png$/, loader: "file-loader", exclude: /node_modules/ }
        ]
    },
    plugins: [
	new webpack.HotModuleReplacementPlugin(),
	// activates HMR
	new webpack.NamedModulesPlugin(),
	// prints more readable module names in the browser console on HMR updates
	new webpack.DefinePlugin({
	    'process.env':{
		'NODE_ENV': JSON.stringify('production')
	    }
	}),
	new webpack.optimize.UglifyJsPlugin({
	    compress:{
		warnings: false
	    }
	})
    ],
};
