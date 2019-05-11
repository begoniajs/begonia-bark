const { parallel } = require('gulp');
const { combineRollupConfig, cpTypes } = require('./util');

const config = {
  input: './src/worker/WorkerManager.js',
  fileName: 'WorkerManger',
  outDir: './dist/worker',
  banner: `// bebark/WorkerManager v1.0.0 by Brave Chan`
};

async function root(cb) {
  await combineRollupConfig(Object.assign({}, config, { outDir: './worker' }));
  cb();
}

async function dist(cb) {
  await combineRollupConfig(config);
  cb();
}

module.exports = parallel(
  parallel(root, cpTypes('./src/worker/WorkerManager.d.ts', './worker/')),
  dist
);