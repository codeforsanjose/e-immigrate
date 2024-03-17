import * as path from 'path';
import type * as webpack from 'webpack';
import type WebpackDevServer from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as WorkboxWebpackPlugin from 'workbox-webpack-plugin';

type WebpackConfiguration = webpack.Configuration;
type DevServer = WebpackDevServer.Configuration;

const port = 8080;
const BYTES_PER_KB = 1024;
const BYTES_PER_MB = (1024 * BYTES_PER_KB);

const isProduction = process.env.NODE_ENV === 'production';
const host = process.env.HOST ?? '0.0.0.0';

const config: WebpackConfiguration = {
    mode: undefined,
    entry: "./src/index.tsx",
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, "dist"),
    },
    performance: {
        maxEntrypointSize: 2 * BYTES_PER_MB,
        maxAssetSize: 2 * BYTES_PER_MB,
    },
    devServer: {
        open: false,
        allowedHosts: "all",
        host,
        port,
        server: {
            type: 'http',
        },
        historyApiFallback: { index: "/", disableDotRule: true },
    } satisfies DevServer,
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html",
        }),

    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: "ts-loader",
                exclude: ["/node_modules/"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|jp2|webp)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.svg$/i,
                type: 'asset',
                resourceQuery: /url/, // *.svg?url
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
                use: [{ loader: '@svgr/webpack', options: { typescript: true } }],
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/i,
                type: "asset",
            },
        ],
    },
    resolve: {
        fallback: {
    
        },
        extensions: [".tsx", ".ts", ".jsx", ".js", '.css', '.scss', '.sass', "..."],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";

        config.plugins?.push(new WorkboxWebpackPlugin.GenerateSW());
    }
    else {
        config.mode = "development";
    }
    return config;
};
