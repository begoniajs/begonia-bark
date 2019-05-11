const rollup = require('rollup');
const clear = require('rollup-plugin-clear');
const { sizeSnapshot } = require('rollup-plugin-size-snapshot');
const { series, parallel, src, dest } = require('gulp');
const rename = require('gulp-rename');

async function combineRollupConfig({
  input,
  outDir,
  fileName = `index.${Date.now()}.js`,
  banner = ''
}) {

  const bundle = await rollup.rollup({
    input,
    plugins: [
      clear({
        targets: [outDir]
      }),
      sizeSnapshot({
        snapshotPath: `./analyze/.${fileName}-size-snapshot.json`
      })
    ]
  });

  return await bundle.write({
    file: `${outDir}/${fileName}.js`,
    format: 'es',
    banner
  });
}

function cpTypes(source, target) {
  return function (cb) {
    src(source)
      .pipe(rename(function(path) {}))
      .pipe(dest(target))
    cb();
  };
}



module.exports = { combineRollupConfig, cpTypes };