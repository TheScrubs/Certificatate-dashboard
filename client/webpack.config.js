const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Dynamic html page generation
let htmlPageNames = ['login', 'register', 'Error404'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/assets/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    // chunks: [`${name}`] // respective JS files
  })
});

module.exports = {
    mode: 'development',
    entry: {
        main: './src/js/main.js',
        login: './src/js/login.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        // publicPath: "/",
        hot: true,
    },
    plugins: [
        // Generates default index.html
        new HtmlWebpackPlugin({
            template: "./src/assets/index.html"
        }) 
    ].concat(multipleHtmlPlugins), // Rest of the html pages
    module: {
        rules: [
            { 
                test: /\.css$/, 
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ] 
            },
            // {
            //     test: /\.(html)$/i,
            //     use: [{ loader: 'html-loader' }] // Loader for all the images
            // },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                //   options: {
                //     presets: ['@babel/preset-env']
                //   }
                }
              }
        ]
    }
}