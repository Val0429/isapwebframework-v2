let config = require('./src/config/default/debug');

module.exports = {
    pages: {
        index: {
            entry: 'main.ts',
            template: 'public/index.html',
            filename: 'index.html',
            favicon: 'public/favicon.ico',
            title: config.title,
            chunks: ['chunk-vendors', 'chunk-common', 'index'],
        },
    },
    productionSourceMap: false,
    css: {
        sourceMap: !config.prodMode,
        loaderOptions: {
            sass: {
                data: `@import "@/../core/scss/helper.scss";`,
            },
        },
    },
    devServer: {
        port: config.port,
        open: config.autoOpen,
        https: config.https,
        historyApiFallback: config.historyApiFallback,
    },
};
