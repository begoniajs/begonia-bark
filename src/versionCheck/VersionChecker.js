/**
 * 小程序sdk版本检测
 * @author Brave Chan on 2018.5.4
 */
//===========================================
/**
 * 检查比较2个版本号
 * @param {String} currentVersion [required] 当前版本
 * @param {String} baseVersion [required] 基础版本
 * @param {Function} cb [optional] 结果回调，如果当前版本低于规定的基础版本，则会调用此函数，否则不会调用.
 */
function check(currentVersion = '0.0.0', baseVersion = '0.0.0', cb) {
  let result = compareVersion(currentVersion, baseVersion);
  let err = null;
  let res = true;
  if (result === -1) {
    err = { currentVersion, baseVersion };
    res = null;
  }
  if (typeof cb === 'function') {
    cb(err, res);
  }
}
/**
 *
 * @param {*} v1
 * @param {*} v2
 */
function compareVersion(v1, v2) {
  v1 = v1.split('.');
  v2 = v2.split('.');
  var len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push('0');
  }
  while (v2.length < len) {
    v2.push('0');
  }

  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i]);
    var num2 = parseInt(v2[i]);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }
  return 0;
}

//===========================================
export default {
  check,
}
