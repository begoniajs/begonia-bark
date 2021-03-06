const { parallel } = require('gulp');
const { combineRollupConfig, cpTypes } = require('./util');

const config = {
  input: './src/storage/StorageManager.js',
  fileName: 'StorageManager', // 输出的文件名称
  outDir: './dist/storage', // 输出的文件夹
  banner: `// bebark/Storage v1.0.0 by Brave Chan`
};

async function root(cb) {
  await combineRollupConfig(Object.assign({}, config, { outDir: './storage' }));
  cb();
}

async function dist(cb) {
  await combineRollupConfig(config);
  cb();
}

module.exports = parallel(
  parallel(root, cpTypes('./src/storage/StorageManager.d.ts', './storage/')),
  dist
);
