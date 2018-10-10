const path = require('path');
console.dir(process.env);
module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase:'dist',
        open: true
    }
}