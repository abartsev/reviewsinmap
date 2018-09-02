module.exports = {
    entry: './index',
    output: {
        filename: 'build.js'
    },
    watch: true,

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: "cheap-inline-module-source-map",

    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }]
    }
}