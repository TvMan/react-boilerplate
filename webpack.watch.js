"use strict";

const chalk = require("chalk");
const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const detect = require("detect-port");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");
const config = require("./webpack.config")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;


const port = parseInt(process.env.PORT, 10) || 3000;
const protocol = process.env.HTTPS === "true" ? "https" : "http";
const host = process.env.HOST || "localhost";

const devServerConfig = {
    compress: false,
    clientLogLevel: "none",
    hot: true,
    host: host,
    port: port,
    public: host,
    publicPath: config.output.publicPath,
    quiet: false,
    watchOptions: {
        ignored: /node_modules/
    },
    https: protocol === "https",
    disableHostCheck: true,
    open: true,
    overlay: {
        warnings: true,
        errors: true
    },
    historyApiFallback: true,
    stats: {
        children: false,
        chunks: false,
        chunkModules: true,
        modules: false,
        reasons: true,
        usedExports: false,
    },
};

config.plugins.push(new webpack.HotModuleReplacementPlugin());
// config.plugins.push(new BundleAnalyzerPlugin());

function compile(port) {
    webpackDevServer.addDevServerEntrypoints(config, devServerConfig);

    const compiler = webpack(config);

    compiler.plugin("invalid", function () {
        console.log(chalk.red("Invalid"));
    });

    compiler.plugin("done", function (stats) {
        const messages = formatWebpackMessages(stats.toJson({}, true));
        const isSuccessful = !messages.errors.length && !messages.warnings.length;

        if (isSuccessful) {
            console.log(chalk.green("Compiled successfully!"));
        }

        if (messages.errors.length) {
            console.log(chalk.red("Failed to compile."));
            messages.errors.forEach(message => {
                console.log(chalk.red(message));
            });
            return;
        }

        if (messages.warnings.length) {
            console.log(chalk.yellow("Compiled with warnings."));
            messages.errors.forEach(message => {
                console.log(chalk.yellow(message));
            });
        }
    });

    const server = new webpackDevServer(compiler, devServerConfig);

    server.listen(port, host, () => {
        console.log(chalk.cyan("Starting the development server..."));
    });
}

detect(port).then(detectedPort => {
    if (detectedPort === port) {
        console.log("Start compile app...");
        compile(port);
        return;
    } else {
        console.log(chalk.red("Port is bisy. Try another port."));
    }
});
