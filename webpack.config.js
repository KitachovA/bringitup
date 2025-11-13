const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
    const isProd = argv.mode === "production";
    const dist = path.resolve(__dirname, "dist");

    // 🧠 Автоматично шукаємо всі HTML-файли у src/
    const htmlFiles = fs.readdirSync(path.resolve(__dirname, "src"))
        .filter(file => file.endsWith(".html"))
        .map(file => new HtmlWebpackPlugin({
            template: `./src/${file}`,
            filename: file, // зберігає ту ж назву
            minify: isProd ? {
                removeComments: true,
                collapseWhitespace: true,
            } : false
        }));

    return {
        mode: isProd ? "production" : "development",
        entry: "./src/js/main.js",
        output: {
            filename: "script.js",
            path: dist,
            clean: true,
        },

        devtool: isProd ? false : "source-map",

        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        debug: !isProd,
                                        corejs: 3,
                                        useBuiltIns: "usage",
                                    },
                                ],
                            ],
                        },
                    },
                },
            ],
        },

        plugins: [
            new CleanWebpackPlugin(),
            ...htmlFiles, // додаємо всі HTML-файли
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, "src/assets"),
                        to: path.resolve(dist, "assets"),
                    },
                ],
            }),
        ],

        devServer: {
            static: {
                directory: dist,
                watch: true,
            },
            port: 4000,
            open: true,
            compress: true,
            hot: true,
            liveReload: false,
            watchFiles: ["src/**/*.html", "src/assets/**/*.*", "src/js/**/*.js"],
            historyApiFallback: false, // ❗ дозволяє звертатися до /modules.html напряму
        },

        stats: "minimal",
    };
};