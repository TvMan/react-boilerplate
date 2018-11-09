"use strict";

const path = require("path");

const paths = {
    entry: "src/index.tsx",
    html: "src/public/index.html",
    nodeModules: "node_modules",
    config: "webpack",
    dist: "dist",
    distAssets: "dist/assets",
    src: "src",
    public: "src/public",
    favicon: "src/public/images/favicon.png"
}

Object.keys(paths).forEach((key) => {
    paths[key] = path.resolve(paths[key]);
});

module.exports = paths;