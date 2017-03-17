var path = require('path');

process.noDeprecation = true;

module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, '/public/build'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-0'],
                plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],

            }
        },
            {test: /\.css$/, loader:'style-loader!css-loader'}
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    node: {
        net: 'empty',
        dns: 'empty'
    }
};