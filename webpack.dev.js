const path = require("path")
const common = require("./webpack.common")
const { merge } = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")

let htmlPageNames = ['house',];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`] // respective JS files
  })
});

module.exports = merge(common, {
   mode: "development",
   output: {
       filename: "[name].js",
       path: path.resolve(__dirname, "dist"),
   },
   plugins: [
    new HtmlWebpackPlugin({
        template: "./src/index.html",
        chunks: ["main"],
        inject: 'body'
       })
   ].concat(multipleHtmlPlugins),
   module: {
       rules: [ {
           test: /\.css$/,
           use: ['style-loader', 'css-loader'] //They load in Reversal
       }
       ]
   }
})