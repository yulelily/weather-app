const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.js",
        "weather-api": "./src/weather-api.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        static: "./dist",
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
        ],
    },
};