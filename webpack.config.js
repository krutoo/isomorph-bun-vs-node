import path from 'node:path';
import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';

/** @type {import('webpack').Configuration} */
export default {
  target: 'node',
  externalsPresets: {
    node: true,
  },
  mode: 'production',
  entry: {
    index: './src/index.ts',
  },
  output: {
    path: path.resolve(import.meta.dirname, 'dist'),
    filename: '[name].js',
    chunkFormat: 'module',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'swc-loader',
        options: {
          sourceMap: true,
          jsc: {
            parser: {
              syntax: 'typescript',
              jsx: true,
            },
            transform: {
              react: {
                runtime: 'automatic',
              },
            },
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: '// @bun',
      raw: true,
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  experiments: {
    outputModule: true,
  },
};
