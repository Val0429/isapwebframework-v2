let config = require('./src/config/default/debug');
let package = require('./src/package.json');

module.exports = {
    pages: {
        index: {
            entry: 'main.ts',
            template: 'public/index.html',
            filename: 'index.html',
            favicon: 'public/favicon.ico',
            title: package.description,
            chunks: ['chunk-vendors', 'chunk-common', 'index'],
        },
    },
    configureWebpack: {
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        }
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
