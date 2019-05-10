/**
 * 发送post请求
 * @param {String} url [required] 请求地址
 * @param {any} data [optional] 参数
 */
function post(url, data = {}) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      dataType: 'json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        let canUse = res && res.data;
        if (!canUse) {
          return reject({
            isError: true,
            message: 'server back error',
            detail: JSON.stringify(res),
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
function get(url, data = {}) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      dataType: 'json',
      method: 'GET',
      success(res) {
        let canUse = res && res.data;
        if (!canUse) {
          return reject({
            isError: true,
            message: 'server back error',
            detail: JSON.stringify(res),
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

export {
  post,
  get,
}
