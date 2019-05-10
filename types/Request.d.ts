/**
 * @description 发送post请求
 * @param {string} url [required] 请求地址
 * @param {object} data [optional] 参数
 */
export function post(url: string, data?: object): Promise;

/**
 * @description 发送get请求
 * @param {string} url [required] 请求地址
 * @param {object} data [optional] 参数对象集合
 */
export function get(url: string, data?: object): Promise;
