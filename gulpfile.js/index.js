const { parallel } = require('gulp');
const frame = require('./frame');
const chain = require('./chain');
const http = require('./http');
const log = require('./log');
const net = require('./net');
const pool = require('./pool');
const storage = require('./storage');
const versionCheck = require('./versionCheck');
const worker = require('./worker');

module.exports = {
  frame,
  chain,
  http,
  log,
  net,
  pool,
  storage,
  versionCheck,
  worker,
  build: parallel(frame, chain, http, log, net, pool, storage, versionCheck, worker)
};