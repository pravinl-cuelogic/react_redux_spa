const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")      // Plugin to generate the index.html on the build
const CleanWebpackPlugin = require("clean-webpack-plugin")   // Plugin to clean the dist folder on every build
const webpack = require("webpack")
const nconf = require("nconf")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

nconf.argv()
    .env()
    .file(path.join(__dirname, "config.json"))

const ENV = nconf.get("NODE_ENV")

const ENV_OBJ = nconf.get(ENV)
console.log("ENV====> ",ENV)
module.exports = !(ENV === "production") ? 
{
    mode: "development",
    entry: {
        script: [
            "./src/static/js/bootstrap.min.js",
            "./src/assets/js/core/jquery.min.js",
            "./src/assets/js/core/bootstrap.min.js"
        ],
        bundle: [
            "webpack-hot-middleware/client?path=/__webpack_hmr",
            "./src/app/masterApp/startup/App.js",
            "./src/index.js"
        ],
        others : [
            "./src/static/js/jquery.easing.min.js",
            "./src/static/js/scrolling-nav.js",
            // "./src/assets/js/core/bootstrap.min.js",
            "./src/assets/js/plugins/chartjs.min.js",
            "./src/assets/js/plugins/perfect-scrollbar.jquery.min.js",
            "./src/assets/js/plugins/bootstrap-notify.js",
            "./src/assets/js/black-dashboard.min.js",
            // "./src/assets/js/black-dashboard.js.map",
            "./src/assets/js/black-dashboard.js",
        ]
    },
    devtool: "inline-source-map",
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, "../dist"),
        publicPath: '/'
    },
    externals: {
        environment: ENV,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("development")
            }
        }),
        new CopyWebpackPlugin([
            {from: "./src/static/images/favicon.ico", to: "dist/"}
        ])
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        babelrc: true,
                        presets: ["env", "react", "stage-2", "stage-3"],
                        plugins: [
                            ["transform-runtime", {
                                "polyfill": false,
                                "regenerator": true,
                                "moduleName": "babel-runtime"
                            }]
                        ]
                    }
                }
            },
            {
                test: /\.mjs$/,
                include: /(node_modules)/,
                type: "javascript/auto"
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            },
            {
                test: /\.(png|jpg|gif|svg|ico)$/,
                use: [
                    "file-loader"
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|ico)$/,
                use: [
                    "file-loader"
                ]
            }
        ]
    }
} 
:
{
    mode: "production",
    entry: {
        script: [
            "./src/static/js/bootstrap.min.js",
            // "./src/static/js/jquery.scrollbar.js"
        ],
        bundle: [
            // "./src/app/masterApp/startup/App.js"
            "./src/index.js"
        ],
        others : [
            "./src/static/js/jquery.easing.min.js",
            "./src/static/js/scrolling-nav.js"
        ]
    },
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, "../dist"),
        publicPath: '/'
    },
    externals: {
        environment: ENV
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: "all",
            minSize: 15000,
            minChunks: 1,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    minSize: 15000,
                    minChunks: 1
                }
            }
        }
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        //new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash].css",
            chunkFilename: "[id].[chunkhash].css"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new CleanWebpackPlugin(["dist"], {
            root: path.resolve(__dirname, "../")
        }),
        new HtmlWebpackPlugin({
            title: "Biproxi - Commercial Real Estate Marketplace",
            template: "./src/template.html",
            filename: "index.html"
        }),
        new CopyWebpackPlugin([
            {from: "./src/static/images/favicon.ico", to: "./"}
        ]),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production'
        }),
        new UglifyJSPlugin({
            uglifyOptions: {
                mangle: false,
                compress: {
                    global_defs: {
                        "process.env.NODE_ENV": "production"
                    },
                    unused: true,
                    dead_code: true, // big one--strip code that will never execute
                    warnings: false, // good for prod apps so users can't peek behind curtain
                    drop_debugger: true,
                    conditionals: true,
                    evaluate: true,
                    drop_console: true, // strips console statements
                    sequences: true,
                    booleans: true,
                }
            }
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            test: /\.(js|css)/,
            algorithm: "gzip"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        babelrc: true,
                        presets: ["env", "react", "stage-2", "stage-3"],
                        plugins: [
                            ["transform-runtime", {
                                "polyfill": false,
                                "regenerator": true,
                                "moduleName": "babel-runtime"
                            }]
                        ]
                    }
                }
            },
            {
                test: /\.mjs$/,
                include: /(node_modules)/,
                type: "javascript/auto"
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    //"style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                    //loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    "file-loader"
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    "file-loader"
                ]
            }
        ]
    }
}

// console.log("module.exports===>",module.exports);