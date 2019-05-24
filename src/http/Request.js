/**
 * 发送post请求
 * @param {String} url [required] 请求地址
 * @param {any} data [optional] 参数
 */
function post(url = '', data = {}, opt = {}) {
  if (!url) {
    return Promise.reject({
      isError: true,
      message: 'param error',
      detail: `The param url that is wrong--->${url}`
    });
  }
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      dataType: 'json',
      method: 'POST',
      header: Object.assign({}, opt.header || {}, {
        'content-type': 'application/x-www-form-urlencoded',
      }),
      success(res) {
        let canUse = res && res.data;
        if (!canUse) {
          return reject({
            isError: true,
            message: 'server back error',
            detail: res,
          });
        }
        return resolve(res.data);
      },
      fail(error) {
        error.isError = true;
        return reject(error);
      },
    });
  });
}

/**
 * 发送get请求
 * @param {String} url [required] 请求地址
 * @param {any} data [optional] 参数对象集合
 */
function get(url = '', data = {}, opt = {}) {
  if (!url) {
    return Promise.reject({
      isError: true,
      message: 'param error',
      detail: `The param url that is wrong--->${url}`
    });
  }
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      dataType: 'json',
      method: 'GET',
      header: Object.assign({}, opt.header || {}, {}),
      success(res) {
        let canUse = res && res.data;
        if (!canUse) {
          return reject({
            isError: true,
            message: 'server back error',
            detail: res,
          });
        }
        return resolve(res.data);
      },
      fail(error) {
        error.isError = true;
        return reject(error);
      },
    });
  });
}

export default {
  post,
  get,
}
