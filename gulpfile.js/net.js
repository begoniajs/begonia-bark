const { parallel } = require('gulp');
const { combineRollupConfig, cpTypes } = require('./util');

const config = {
  input: './src/net/NetService.js',
  fileName: 'NetService',
  outDir: './dist/net',
  banner: `// bebark/NetService v1.0.0 by Brave Chan`
};

async function root(cb) {
  await combineRollupConfig(Object.assign({}, config, { outDir: './net' }));
  cb();
}

async function dist(cb) {
  await combineRollupConfig(config);
  cb();
}

module.exports = parallel(
  parallel(root, cpTypes('./src/net/NetService.d.ts', './net/')),
  dist
);