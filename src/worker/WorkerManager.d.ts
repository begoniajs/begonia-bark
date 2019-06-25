
declare namespace WorkerManager {
  /**
   * @public
   * @description 开启/关闭 debug模式
   * @returns {boolean}
   */
  export const debug: boolean;
  /**
   * @public
   * @description 当前工作中的worker
   * @returns {string}
   */
  export const currentWorkerKey: string;
  /**
   * @public
   * @description WM是否正在工作中
   * @returns {boolean}
   */
  export const working: boolean;
  /**
   * @public
   * @description 获取注册的worker列表
   * 只有在开启了debug模式的情况才可用
   * @returns {any}
   */
  export const workers: any;
  /**
   * @public
   * @description 获取所有已经注册的worker标识集合
   * @returns {any}
   */
  export const workerKeys: any;
  /**
   * @public
   * @description 应用配置文件
   * @param {any} config
   */
  export function config(config: any): void;
  /**
   * @public
   * @description 动态注册一个worker
   * @param {*} opt
   * ```
   * opt{
   *   [workerKey]: workerPath,
   * }
   * ```
   */
  export function rejester(opt: any): void;
  /**
 * @public
 * @description 向worker发送消息
 * @param {string} workerKey [required] 要使用的worker的键名
 * @param {any} data [optional] 发送的消息数据对象
 * @param {(err: any, res: any) => void} cb [optional] 结果回调函数
 */
  export function message(workerKey: string, data?: any, cb?: (err: any, res: any) => void): void;
  /**
   * @public
   * @description 清空所有的workers
   */
  export function clearWorkers(): void;
}

export default WorkerManager;
