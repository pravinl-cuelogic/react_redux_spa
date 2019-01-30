const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")      // Plugin to generate the index.html on the build
const CleanWebpackPlugin = require("clean-webpack-plugin")   // Plugin to clean the dist folder on every build
const webpack = require("webpack")

module.exports = {

    context: path.join(__dirname,"../"),
    entry: [
        "./src/index.js"
    ],
    devtool: "inline-source-map",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,"../dist"),
        publicPath: '/'
    },
    plugins: [
        new CleanWebpackPlugin(["dist"],{
            root: path.join(__dirname,"../")
        }),
        new HtmlWebpackPlugin({
            title: "Output Management",
            template: "./src/index.html",
            filename: "index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use:{
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
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.scss$/,
                use:[{
                    loader: "style-loader"
                },{
                    loader: "css-loader"
                },{
                    loader: "sass-loader"
                }]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use:[
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