const path = require("path")
const common = require("./webpack.common")
const { merge } = require("webpack-merge")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin");

let htmlPageNames = ['house',];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`], // respective JS files
    minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
    }
  })
});

module.exports = merge(common, {
   mode: "production",
   output: {
       filename: "[name][contenthash].js",
       path: path.resolve(__dirname, "dist"),
       clean: true,
   },
   optimization: {
       minimizer: [
        // new CssMinimizerPlugin(),
        new TerserPlugin(),
        new HtmlWebpackPlugin({
        template: "./src/index.html",
        chunks: ['main'],
        inject: 'body',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true,
            }
        })
    ].concat(multipleHtmlPlugins)
   },
   plugins: [
       new MiniCssExtractPlugin(
           { filename: "[name].[contenthash].css" }
           )
        ,

   ],
   module: {
    rules: [ {
        test: /\.css$/,
        use: [
            MiniCssExtractPlugin.loader, //Extract css into files
            'css-loader'
        ] //They load in Reversal
    }
    ]
   }
})