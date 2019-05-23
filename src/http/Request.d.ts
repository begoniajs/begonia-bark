
declare interface IResponse {}
declare interface IError {
  isError?: boolean;
  message?: any;
  detail?: any;
}

/**
 * @description http请求
 */
declare namespace Request {
  /**
   * @description 发送post请求
   * @param {string} url [required] 请求地址
   * @param {object} data [optional] 参数
   * @param {object} opt [optional] 附加设置，可以对请求进行设置，例如请求头设置
   * 注意当设置请求头字段时，方法中的已有设置将会覆盖自定义设置
   * @returns {Promise<IResponse | IError>} promise
   */
  export function post(url: string, data?: object, opt?: object): Promise<IResponse | IError>;

  /**
   * @description 发送get请求
   * @param {string} url [required] 请求地址
   * @param {object} data [optional] 参数对象集合
   * @param {object} opt [optional] 附加设置，可以对请求进行设置，例如请求头设置
   * 注意当设置请求头字段时，方法中的已有设置将会覆盖自定义设置
   * @returns {Promise<IResponse | IError>} promise
   */
  export function get(url: string, data?: object, opt?: object): Promise<IResponse | IError>;
}

export default Request;
