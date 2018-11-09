"use strict";

const paths = require("./webpack.paths");
const appConfig = require("./app.config");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const debug = process.env.DEBUG === "true";
const webpackConfig = {
    entry: {
        main: ["@babel/polyfill", paths.entry],
    },
    devtool: debug,
    output: {
        path: paths.dist,
        pathinfo: true,
        filename: debug ? "js/[name].js" : "[name].[hash].js",
        chunkFilename: "js/[name].js",
        libraryTarget: "var",
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".less", ".css", ".html", ".woff", ".woff2", ".otf", ".ttf", ".eot", ".svg", ".png", ".jpg", ".gif"],
        modules: ["node_modules", "src"],

    },
    module: {
        rules: [{
            test: /\.(j|t)sx?$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    babelrc: false,
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                targets: {
                                    browsers: "last 5 versions"
                                }
                            }, // or whatever your project requires
                        ],
                        "@babel/preset-typescript",
                        "@babel/preset-react",
                    ],
                    plugins: [
                        "@babel/plugin-transform-regenerator",
                        ["@babel/plugin-proposal-decorators", { legacy: true }],
                        ["@babel/plugin-proposal-class-properties", { loose: true }],
                        "react-hot-loader/babel",
                    ],
                },
            },
        },
        {
            test: /\.(le|c)ss$/,
            include: paths.src,
            use: [
                process.env.NODE_ENV !== "prod" ? MiniCssExtractPlugin.loader : "style-loader",
                "css-loader",
                "postcss-loader",
                "less-loader",
            ],
        },
        {
            test: /\.(png|jpg|gif|woff|woff2|otf|ttf|eot|svg)$/i,
            include: paths.public,
            use: {
                loader: "file-loader",
                options: {
                    name: debug ? "[name].[ext]" : "[name].[hash].[ext]",
                    outputPath: "./assets",
                }
            }
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].[hash].css",
        }),
        new ForkTsCheckerWebpackPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            title: "React boilerplate",
            template: paths.html,
            inject: true,
            favicon: paths.favicon
        }),
        new webpack.DefinePlugin({
            "process.env": appConfig,
        }),
    ],
    mode: "none",
    node: {
        fs: "empty",
        net: "empty",
        tls: "empty",
        constants: false
    }
};

if (debug) {
    webpackConfig.devtool = "inline-source-map";
    webpackConfig.mode = "development";
    webpackConfig.optimization = {
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    };
} else {
    webpackConfig.mode = "production";
    webpackConfig.devtool = "none";
}

module.exports = webpackConfig;