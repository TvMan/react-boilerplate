let appConfig = {
    default: {
        NODE_ENV: process.env.NODE_ENV,
        DEBUG: process.env.DEBUG,
        HOST: process.env.HOST,
        PORT: process.env.PORT,
        API_URL: "https://dev-api.localhost"
    },
    dev: {},
    qa: {},
    stage: {},
    prod: {}
}

appConfig = Object.assign({}, appConfig.default, appConfig[process.env.NODE_ENV])

Object.keys(appConfig).forEach((key) => {
    appConfig[key] = JSON.stringify(appConfig[key]);
});


module.exports = appConfig;