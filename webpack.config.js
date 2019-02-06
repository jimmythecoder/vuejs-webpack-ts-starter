const path                          = require('path');
const fs                            = require("fs");
const webpack                       = require('webpack');
const htmlWebpackPlugin             = require('html-webpack-plugin');
const MiniCssExtractPlugin          = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin    = require('fork-ts-checker-webpack-plugin');
const CleanWebpackPlugin            = require('clean-webpack-plugin');
const Bump                          = require("bump-webpack-plugin");
const CopyWebpackPlugin             = require('copy-webpack-plugin');
const apiMocker                     = require('connect-api-mocker');
const SvgStorePlugin                = require('webpack-svg-icon-system/lib/SvgStorePlugin');
const VueLoaderPlugin               = require('vue-loader/lib/plugin');

const sourcePath    = path.resolve(__dirname,'src');
const outputPath    = path.resolve(__dirname,'dist');
const isProd        = process.argv.indexOf("-p") !== -1;
const pkg           = JSON.parse(fs.readFileSync('./package.json'));

const config = {

    mode: isProd ? "production" : "development",

    entry: `${sourcePath}/app.ts`,
    
    output: {
        filename: 'assets/js/[name].[hash].bundle.js',
        path: outputPath,
        devtoolModuleFilenameTemplate: info => {
            if (info.resource.match(/\.vue$/)) {
              $filename = info.allLoaders.match(/type=script/)
                        ? info.resourcePath : 'generated';
            } else {
              $filename = info.resourcePath;
            }
            return $filename;
        }
    },

    devServer: {
        historyApiFallback: true,
        noInfo: true,
        contentBase: outputPath,
        compress: true,
        hot: true,
        port: 3000,
        host: '0.0.0.0',
        disableHostCheck: true,
        before: function(app) {
            app.use('/api', function(req, res, next) {return setTimeout(next, req.query.mockdelay || 0)}), // Simulate bandwidth delays
            app.use('/api', apiMocker('src/mocks/api'));
        }
    },

    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json', '.scss', '.sass'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': sourcePath
        }
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                loader: 'ts-loader',
                test: /\.ts?$/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    transpileOnly: true
                }
            },
            {
                test: /\.css$/,
                use: isProd ? [
                    'vue-style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ] : [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: {
                  loader: "file-loader",
                  options: {
                    outputPath: 'assets/fonts'
                  },
                },
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                use: {
                  loader: "file-loader",
                  options: {
                    outputPath: 'assets/images'
                  }
                }
            },
            {
                test: /\.(webm|mp4)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets/video'
                    }
                }
            },
            {
                test: /\.scss$/,
                use: isProd ? [
                    {loader: 'vue-style-loader'},
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader'},
                    {loader: 'sass-loader'},
                ] : [
                    {loader: 'vue-style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'sass-loader'},
                ]
            },
            {
                loader: 'webpack-svg-icon-system',
                test: /\.svg$/,
                options: {
                    name: 'assets/icons/icon_bundle.svg'
                }
            }
        ]
    },

    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new htmlWebpackPlugin({
            template: `${sourcePath}/index.ejs`,
            version: pkg.version
        }),
        new CleanWebpackPlugin([outputPath]),
        new CopyWebpackPlugin([
            {
                context: 'src/assets/browser',
                from: '*',
                to: ''
            }
        ]),
        new SvgStorePlugin(),
        new VueLoaderPlugin()
    ]
};

if(isProd) {

    config.plugins.push(
        new Bump([
            'package.json',
            'src/assets/browser/manifest.json'
        ])
    );

    config.plugins.push(
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "assets/css/[name].[hash].css",
            chunkFilename: "assets/css/[id].[hash].css"
        })
    );

    config.devtool = "source-map";

} else {

    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );

    config.devtool = "inline-source-map";
}

module.exports = config;
