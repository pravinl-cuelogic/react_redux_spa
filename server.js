import express from "express";
import * as fs from "fs";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import cheerio from "cheerio";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import nconf from "nconf";
import fetch from "isomorphic-fetch";

console.log("server file --------------------------")

const app = express()

const CONFIG_DIR = path.resolve(__dirname, "../config/")
// console.log("nconf==>>>", nconf.argv().env())
console.log("CONFIG_DIR==>>>", CONFIG_DIR)
nconf.argv()
    .env()
.file(CONFIG_DIR + "/config.json")
console.log('1111111111111111',CONFIG_DIR);

const CURRENT_ENV = nconf.get("NODE_ENV")
const SSR_ENABLED = nconf.get("SSR")
// console.log("SSR_ENABLED==>>>", CURRENT_ENV)
const PORT = parseInt(nconf.get("PORT"));

if (SSR_ENABLED) {
    console.log('================================');
    const App = require("./src/app/masterApp/startup/App").default
    const temp = fs.readFileSync(path.join(__dirname, "index.html")).toString()
    const $ = cheerio.load(temp)

    const context = {}
    app.use(express.static(__dirname))
    app.get("/*", function (req, resp) {
        const appRoot = ReactDOMServer.renderToString(
            <StaticRouter
                location={req.url}
                context={context}
            >
                <App />
            </StaticRouter>
        )
        $("#root").prepend(appRoot)
        resp.write($.html())
        resp.end()
    })
} 
//else {

    console.log('+++++++++++++++++++++++++++++++++++');
    if (CURRENT_ENV != 'production') {
        console.log('2222222222222222222222222');
        const config = require(CONFIG_DIR + "/webpack.config.dev")
        console.log('2.1-----------------------');
        const compiler = webpack(config)
        console.log('2.2-----------------------');
        app.use(webpackDevMiddleware(compiler, {
            publicPath: config.output.publicPath,
            historyApiFallback: true
        }))
        console.log('2.3-----------------------');
        app.use(require("webpack-hot-middleware")(compiler))
        console.log('2.4-----------------------');
    } else {
        console.log('33333333333333333333333333333333');
        app.get("/*.js", (req, resp, next) => {

            req.url = req.url + ".gz"
            resp.set("Content-Encoding", "gzip")
            resp.set('Content-Type', 'text/javascript');
            next()
        })
    }
    console.log('444444444444444444444444444444444');
    app.use(express.static(__dirname))
    console.log('555555555555555555555555555555555');
    app.get("/*", (req, resp, next) => {
        console.log('66666666666666666666666666666666666');
        resp.sendFile(path.resolve(__dirname, "./src/index.html"))
        // resp.write($.html())
    })
    console.log('77777777777777777777777777777777777777');
// }

app.listen(PORT, function () {
    console.log("Example app listening on port " + PORT)
})
console.log('88888888888888888888888888888888888888888');