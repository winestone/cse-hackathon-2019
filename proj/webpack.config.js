const path = require("path");

// https://webpack.js.org/configuration/
module.exports = {
    mode: "production",

    entry: "./src/frontend",

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    output: {
        publicPath: "/dist/",
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".jsx", ".scss"]
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                // exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, "src/common"),
                    path.resolve(__dirname, "src/frontend"),
                ],
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, "src/common"),
                    path.resolve(__dirname, "src/frontend"),
                ],
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    /* externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    } */
};
