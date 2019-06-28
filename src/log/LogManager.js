/**
 * 日志管理类
 *
 * @author Brave Chan on 2017.8
 *
 */
//===============================================

//==============================================
let _debug = false;
const NORMAL = 'l1';
const INFO = 'l2';
const ERROR = 'l3';
const WARN = 'l4';
const style = {
  l1: 'log__txt--normal',
  l2: 'log__txt--info',
  l3: 'log__txt--error',
  l4: 'log__txt--warn',
};
let _logList = [];
/**
 * @internal
 * @description 格式化时间
 * @param {Number} num [required] 从1970.1.1至今的毫秒数
 * @param {Boolean} limit 是否只返回y-m-d的形式
 * @param {Boolean} noSecond 是否取出时分秒
 * @returns {String} 时间格式
 */
function formatTime(num, limit = true, noSecond = false) {
  if (typeof num !== 'number' || !Number.isInteger(+num)) {
    return num;
  }
  const date = new Date(num);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const ymd = [year, month, day].map(formatNumber).join('-');
  if (limit) {
    return ymd;
  }

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  let list = [hour, minute, second];
  if (noSecond) {
    list = list.slice(0, list.length - 1);
  }

  return ymd + ' ' + list.map(formatNumber).join(':')
}

/**
 * @internal
 * @description 格式化分秒数字
 * @param {Number} n [required] 数字
 * @returns {String} 格式化后的数字
 */
function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}
//===============================================
/**
 * 日志单项
 */
class LogItem {
  constructor(type, message, detail) {
    this.className = style[type];
    this.message = message;
    this.detail = detail;
    let timeNum = Date.now();
    this.time = formatTime(timeNum, false);
    this.id = timeNum + Math.random();
  }
}
//================================================
/**
 * @private
 *
 * 变为数组
 * @param {*} list
 */
function toArray(list) {
  return Array.from(list);
}

/**
 * @private
 * 将对象处理成json字符串
 * @param {*} obj
 */
function handleObj(obj) {
  try {
    return JSON.stringify(obj);
  } catch (error) {
    return JSON.stringify({
      message: 'stringify json error,please check.',
    });
  }
}

/**
 *  @private
 *
 * 将日志信息整理合并为单条字符串
 * @param {*} list
 */
function tidyMessage(list) {
  for (let i = 0, len = list.length; i < len; i++) {
    let item = list[i];
    if (item && typeof item === 'object') {
      list[i] = handleObj(item);
    }
  }
  let cnt = list.join('<==>');
  return cnt;
}
//================================================
/**
 *  @public
 *
 * 输出普通日志
 */
function trace() {
  let list = toArray(arguments);
  let cnt = tidyMessage(list);
  _logList[_logList.length] = new LogItem(NORMAL, '消息', cnt);
  if (_debug) {
    console.log.apply(console, arguments);
  }
}
/**
 *  @public
 *
 * 输出信息日志
 */
function info() {
  let list = toArray(arguments);
  let cnt = tidyMessage(list);
  _logList[_logList.length] = new LogItem(INFO, '信息', cnt);
  if (_debug) {
    console.info.apply(console, arguments);
  }
}
/**
 *  @public
 *
 * 输出错误日志
 */
function error() {
  let list = toArray(arguments);
  let cnt = tidyMessage(list);
  _logList[_logList.length] = new LogItem(ERROR, '错误', cnt);
  if (_debug) {
    console.error.apply(console, arguments);
  }
}
/**
 * @public
 *
 * 输出警告日志
 */
function warn() {
  let list = toArray(arguments);
  let cnt = tidyMessage(list);
  _logList[_logList.length] = new LogItem(WARN, '警告', cnt);
  if (_debug) {
    console.warn.apply(console, arguments);
  }
}
//==========================================
export default {
  trace,
  info,
  error,
  warn,
  /**
   * 获取日志信息列表
   */
  get logList() {
    return _logList;
  },
  /**
   * 开启/关闭 debug模式
   */
  set debug(value) {
    _debug = !!value;
  },
  get debug() {
    return _debug;
  },
  /**
   * @internal
   * 进行销毁LogManager的操作
   */
  destroy() {
    _logList = null;
  },
};
