const baseStyleLoaders = [
    // Creates `style` nodes from JS strings
    require.resolve('style-loader'),
    // Translates CSS into CommonJS
    require.resolve('css-loader'),
];

const styleLoaders = [
    ...baseStyleLoaders,
    // Compiles Sass to CSS
    require.resolve('less-loader'),
];

module.exports = [
    {
        test: /\.tsx?$/,
        loader: require.resolve('awesome-typescript-loader'),
        // options: {},
    },
    {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        use: [
            {
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]',
                    limit: false,
                    outputPath: './assets/img/',
                },
            },
        ],
    },
    {
        test: /\.(eot|ttf|woff|woff2)$/i,
        use: [
            {
                loader: require.resolve('file-loader'),
                options: {
                    name: 'file-loader?name=[name].[ext]',
                    limit: false,
                    outputPath: './dist',
                },
            },
        ],
    },
    {
        test: /\.css$/i,
        use: baseStyleLoaders,
    },
    {
        test: /\.s[ac]ss$/i,
        use: styleLoaders,
    },
    {
        test: /\.less$/i,
        use: styleLoaders,
    },
];
