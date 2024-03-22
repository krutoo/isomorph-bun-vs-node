import path from 'node:path';
import rspack from '@rspack/core';

/** @type {import('@rspack/cli').Configuration} */
export default {
  target: 'node',
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
        loader: 'builtin:swc-loader',
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
        type: 'javascript/auto',
      },
      {
        test: /\.css$/i,
        type: 'css',
      },
      {
        test: /\.(module|m)\.css$/i,
        type: 'css/module',
      },
      {
        test: /\.(module|m)\.scss$/i,
        use: 'sass-loader',
        type: 'css/module',
      },
      {
        test: /\.(apng|avif|gif|jpg|jpeg|png|webp)$/i,
        type: 'asset',
      },
    ],
  },
  plugins: [
    // we need this bacause of https://discord.com/channels/876711213126520882/1211928485715771412/1217695101334327307
    new rspack.BannerPlugin({
      banner: '// @bun',
      raw: true,
      entryOnly: true,
      exclude: /\.css$/i,
    }),
  ],
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin({
        format: {
          comments: /@bun/i,
        },
        extractComments: false,
      }),
      new rspack.SwcCssMinimizerRspackPlugin(),
    ],
  },
  experiments: {
    outputModule: true,
  },
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
  },
  builtins: {
    css: {
      modules: {
        localIdentName: '[name]__[local]__[hash:3]',
      },
    },
  },
};
