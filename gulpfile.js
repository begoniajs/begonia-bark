const gulp = require('gulp');
const rollup = require('rollup');
const clear = require('rollup-plugin-clear');
const { sizeSnapshot } = require('rollup-plugin-size-snapshot');

async function combineRollupConfig({ input, outDir, fileName = `index.${Date.now()}.js` , banner = '' }) {

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



// gulp.task('build', function(cb) {

//   // cb();
// });

gulp.task('frame', async function(cb) {
  await combineRollupConfig({
    input: './src/frame/FrameLite.js',
    fileName: 'frame',
    outDir: './dist/frame',
    banner: `// bebark/frame v1.0.0 by Brave Chan`
  });
  cb();
});

gulp.task('workers', async function(cb) {
  await combineRollupConfig({
    input: './src/worker/WorkerManager.js',
    fileName: 'WorkerManger',
    outDir: './dist/worker',
    banner: `// bebark/WorkerManager v1.0.0 by Brave Chan`
  });
  cb();
});

gulp.task('pool', async function(cb) {
  await combineRollupConfig({
    input: './src/pool/Pool.js',
    fileName: 'Pool',
    outDir: './dist/pool',
    banner: `// bebark/pool v1.0.0 by Brave Chan`
  });
  cb();
});

gulp.task('http', async function(cb) {
  await combineRollupConfig({
    input: './src/http/Request.js',
    fileName: 'Request',
    outDir: './dist/http',
    banner: `// bebark/Request v1.0.0 by Brave Chan`
  });
  cb();
});

gulp.task('net', async function(cb) {
  await combineRollupConfig({
    input: './src/net/NetService.js',
    fileName: 'NetService',
    outDir: './dist/net',
    banner: `// bebark/NetService v1.0.0 by Brave Chan`
  });
  cb();
});

gulp.task('storage', async function(cb) {
  await combineRollupConfig({
    input: './src/storage/StorageManager.js',
    fileName: 'Storage',
    outDir: './dist/storage',
    banner: `// bebark/Storage v1.0.0 by Brave Chan`
  });
  cb();
});

gulp.task('log', async function(cb) {
  await combineRollupConfig({
    input: './src/log/LogManager.js',
    fileName: 'LogManager',
    outDir: './dist/log',
    banner: `// bebark/Log v1.0.0 by Brave Chan`
  });
  cb();
});

gulp.task('chain', async function(cb) {
  await combineRollupConfig({
    input: './src/chain/chain.js',
    fileName: 'chain',
    outDir: './dist/chain',
    banner: `// bebark/chain v1.0.0 by Brave Chan`
  });
  cb();
});

gulp.task('versionCheck', async function(cb) {
  await combineRollupConfig({
    input: './src/versionCheck/VersionChecker.js',
    fileName: 'VersionChecker',
    outDir: './dist/versionCheck',
    banner: `// bebark/versionCheck v1.0.0 by Brave Chan`
  });
  cb();
});

exports.build = gulp.parallel(
  'frame',
  'workers',
  'pool',
  'http',
  'net',
  'storage',
  'log',
  'chain',
  'versionCheck'
);
