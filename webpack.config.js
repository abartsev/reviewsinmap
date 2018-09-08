module.exports = {
    entry: './map',
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