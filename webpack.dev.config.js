const {resolve} = require('path');
const webpack = require('webpack');
const DefinePlugin = webpack.DefinePlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: resolve(__dirname, 'src'),
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './scripts/main.js'
    ],
    output: {
        filename: 'main.js',
        path: resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devtool: 'source-map',
    devServer: {
        hot: true,
        contentBase: resolve(__dirname),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader',],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: "css-loader"
                            },
                            {
                                loader: "sass-loader"
                            }
                        ],
                        fallback: "style-loader"
                    }
                ))
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                use: 'url-loader'
            },
        ]
    },
    plugins: [
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                GIPHY_API_URL: JSON.stringify('https://api.giphy.com/v1/gifs/trending?api_key=PcjmiLw5b2yfws6iD47n1uHDbRPkSD0A&limit=20&rating=G')
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin({filename: 'styles.css', allChunks: true})
    ],
};
