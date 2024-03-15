import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import type webpack from 'webpack';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const config: webpack.Configuration = {
  entry: path.resolve(__dirname, './app/index.tsx'),
  context: path.resolve(__dirname),
  resolve: {
    alias: {
      '@farfetch/blackout-analytics': path.resolve(
        __dirname,
        '../../packages/analytics/dist',
      ),
      '@farfetch/blackout-client': path.resolve(
        __dirname,
        '../../packages/client/dist',
      ),
      '@farfetch/blackout-react': path.resolve(
        __dirname,
        '../../packages/react/dist',
      ),
      '@farfetch/blackout-redux': path.resolve(
        __dirname,
        '../../packages/redux/dist',
      ),
    },
    extensions: ['.js', '.jsx', '.d.ts', '.ts', '.tsx'],
  },
  mode:
    (process.env.NODE_ENV as webpack.Configuration['mode']) || 'development',
  optimization: {
    // Helps debugging and build perf.
    // Bundle size is irrelevant for local serving
    minimize: false,
  },
  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: '/',
    filename: 'tests.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './app/template.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          configFile: path.resolve(__dirname, '../../babel.config.js'),
        },
      },
      {
        test: /\.(jpg|gif|png)$/,
        type: 'asset/inline',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, './postcss.config.ts'),
              },
            },
          },
        ],
      },
    ],
  },
  target: 'web',
};

export default config;
