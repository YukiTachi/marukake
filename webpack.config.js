const path = require('path');
console.dir(process.env);
module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ]
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        contentBase:'dist',
        open: true
    }
}
