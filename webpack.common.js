const path = require("path")
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
   entry: {
            main: "./src/index.js",
            house: "./src/house.js"
        }, //Source of the main js file
   plugins:[
       new CopyPlugin({
        patterns: [
            { from: "./node_modules/three/examples/js/libs/draco", to: "draco" }
        ],
      }),
],
   module: {
       rules: [
           {
                test: /\.(svg|png|jpg|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[contenthash][ext][query]'
                }
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(glb|gltf)$/,
                type: 'asset/resource',
                generator: {
                    // filename: 'assets/[hash][ext][query]'
                    filename: 'assets/[contenthash][name][ext]'
                }
            },
       ]
   }
}