var path = require("path")

module.exports = {

    context: path.resolve(__dirname,"../"),
    entry: [
        "./server.js"
    ],
    target:"node",
    node:{
        __filename:false,
        __dirname: false
    },
    output: {
        filename: "backend.js",
        path: path.resolve(__dirname,"../dist")
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
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
                    "css-loader"
                ]
            },
            {
                test: /\.scss$/,
                use:[{
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