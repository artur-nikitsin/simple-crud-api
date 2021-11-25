const path = require('path')

module.exports = {
    entry: {
        main: './server.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js',
    },
}
