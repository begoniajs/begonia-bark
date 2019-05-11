
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
   * @returns {Promise<IResponse | IError>} promise
   */
  export function post(url: string, data?: object): Promise<IResponse | IError>;

  /**
   * @description 发送get请求
   * @param {string} url [required] 请求地址
   * @param {object} data [optional] 参数对象集合
   * @returns {Promise<IResponse | IError>} promise
   */
  export function get(url: string, data?: object): Promise<IResponse | IError>;
}

export default Request;


