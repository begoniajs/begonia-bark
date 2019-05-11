const { parallel } = require('gulp');
const { combineRollupConfig, cpTypes } = require('./util');

const config = {
  input: './src/log/LogManager.js',
  fileName: 'LogManager',
  outDir: './dist/log',
  banner: `// bebark/Log v1.0.0 by Brave Chan`
};

async function root(cb) {
  await combineRollupConfig(Object.assign({}, config, { outDir: './log' }));
  cb();
}

async function dist(cb) {
  await combineRollupConfig(config);
  cb();
}

module.exports = parallel(
  parallel(root, cpTypes('./src/log/LogManager.d.ts', './log/')),
  dist
);