import webpack from 'webpack';
import path from 'path';

const config= {
    entry: {
        app: path.join(__dirname, 'src', 'main', 'js', 'app.ts'),
    },
    output: {
        publicPath: '/assets/js/',
        path: path.join(__dirname, 'dist', 'assets', 'js'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['*', '.webpack.js', '.js', '.ts', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        },
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: ['babel-loader', 'vue-ts-loader'],
            exclude: /node_modules/,
        }, {
            test: /\.vue$/,
            use: ['babel-loader', {
                loader: 'vue-loader',
                options: {
                    js: 'vue-ts-loader',
                },
            }],
            exclude: /node_modules/,
        }],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
    ],
    devtool: '#source-map',
};

if(process.env.NODE_ENV !== 'production')
{
    // want build performance
    // https://webpack.github.io/docs/build-performance.html
    config.output.pathinfo= true;
    config.devtool= 'eval';
    config.devServer= {
        contentBase: path.join(__dirname, 'dist'),
        watchContentBase: true,
        inline: true,
    };
}

export default config;