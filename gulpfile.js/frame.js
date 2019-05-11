const { parallel } = require('gulp');
const { combineRollupConfig, cpTypes } = require('./util');

const config = {
  input: './src/frame/FrameLite.js',
  fileName: 'frame',
  outDir: './dist/frame',
  banner: `// bebark/frame v1.0.0 by Brave Chan`
};

async function root(cb) {
  await combineRollupConfig(Object.assign({}, config, { outDir: './frame' }));
  cb();
}

async function dist(cb) {
  await combineRollupConfig(config);
  cb();
}

module.exports = parallel(
  parallel(root, cpTypes('./src/frame/frame.d.ts', './frame/')),
  dist
);