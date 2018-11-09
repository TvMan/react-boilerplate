"use strict";

const chalk = require("chalk");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const config = require("./webpack.config");
const paths = require("./webpack.paths");

config.plugins.push(
    new CleanWebpackPlugin([paths.dist], {
        root: process.cwd(),
        verbose: true,
        dry: false
    }));
build();

function printErrors(summary, errors) {
    console.log(chalk.red(summary));
    errors.forEach(err => {
        console.log(err.message || err);
    });
}

function build() {
    console.log("Creating an optimized build...");
    webpack(config).run((err, stats) => {
        if (err) {
            printErrors("Failed to compile.", [err]);
            process.exit(1);
        }

        if (stats.compilation.errors.length) {
            printErrors("Failed to compile.", stats.compilation.errors);
            process.exit(1);
        }

        if (process.env.CI && stats.compilation.warnings.length) {
            printErrors("Failed to compile. When process.env.CI = true, warnings are treated as failures. Most CI servers set this automatically.", stats.compilation.warnings);
            process.exit(1);
        }

        console.log(chalk.green("Compiled successfully."));
    });
}