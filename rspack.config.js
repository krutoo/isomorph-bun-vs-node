import path from 'node:path';
import rspack from '@rspack/core';

/** @type {import('@rspack/cli').Configuration} */
export default {
  target: 'node',
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
    ],
  },
  experiments: {
    outputModule: true,
  },
};
