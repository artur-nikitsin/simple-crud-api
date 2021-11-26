const path = require('path')

module.exports = {
    entry: './server.js',
    mode: 'production',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
}
