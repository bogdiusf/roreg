const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

// const jsPages =

const HtmlWebpackPlugins = [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'webpack_templates', 'default.html'),
    filename: path.resolve(__dirname, 'website/_layouts/default.html'),
    chunks: ['base'],
    minify: false,
  }),

  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'webpack_templates', 'index.html'),
    filename: path.resolve(__dirname, 'website/index.html'),
    chunks: ['main'],
    minify: false,
  }),
]

module.exports = (env) => {
  const PROD = env != null && env.production

  return {
    mode: PROD ? 'production' : 'development',
    watch: !PROD,
    entry: {
      base: path.join(__dirname, 'js', 'base'),
      main: path.join(__dirname, 'js', 'main'),
    },
    output: {
      filename: PROD ? '[name]-[hash].js' : '[name]-bundle.js',
      path: path.resolve(__dirname, 'website/assets/js'),
      publicPath: '/assets/js',
    },
    module: {
      rules: [
        {
          test: /.js$/,
          exclude: [path.resolve(__dirname, 'node_modules')],
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      ],
    },
    plugins: HtmlWebpackPlugins,
  }
}
