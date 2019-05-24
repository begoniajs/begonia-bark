declare class StorageInfo {
  /**
   * @description 构造函数
   * @param {number} invalidateTime [required] 缓存时间，单位ms，默认为0
   * @param {string} masterKey [required] 存储主键
   * @param {boolean} isSync [optional] 方法是否为同步
   */
  constructor(invalidateTime: number, masterKey: string, isSync?: boolean);
  /**
   * @description 过期时间的毫秒数
   */
  invalidateTime: number;
  /**
   * @public
   * @description 按照参数保存数据到缓存
   * @param {any[]} params [required] 参数集合
   * @param {any} data [required] 保存的值
   * @param {(error: object, result: any) => void} cb [optional] 回调函数，`function(error,result){}`
   */
  save(params: any[], data: any, cb: (error: object, result: any) => void): void;
  /**
   * @public
   * @description 按照参数读取缓存
   * @param {any[]} params [required] 参数集合
   * @param {(error: object, result: any) => void} cb [required] 回调函数，`function(error,result){}`
   */
  read(params: any[], cb: (error: object, result: any) => void): void;
  /**
   * @public
   * @description 清除管理数据
   * @param {string} key [required] 存储键名，
   * > 是指合成后的键名，而不是`masterKey`
   */
  clear(key: string): void;
  /**
   * @public
   * @description 检查某一条缓存是否过期，过期的将会被删掉
   * @param {string} storageKey [required] 存储键名，
   * > 是指合成后的键名，而不是`masterKey`
   */
  check(storageKey: string): void;
  /**
   * @public
   * @description 摧毁缓存对象，以备回收
   */
  destory(): void;
}
/**
 * @description 缓存管理
 * @author Brave Chan on 2017.8.23
 */
declare namespace Storage {
  /**0ms */
  export const ZERO: number;
  /**15 minutes*/
  export const SHORTEST_INVALIDATE: number;
  /**half an hour*/
  export const SHORTER_INVALIDATE: number;
  /**one hour*/
  export const SHORT_INVALIDATE: number;
  /**three hours*/
  export const LONG_INVALIDATE: number;
  /**six hours*/
  export const LONGER_INVALIDATE: number;
  /**one day*/
  export const LONGEST_INVALIDATE: number;
  /**two days*/
  export const TOO_LONG_INVALIDATE: number;
  /**forever*/
  export const FOREVER: number;
  /**
   * ten seconds,
   * only for debug and test.
   * */
  export const TEST_INVALIDATE: number;
  //====================================
  export let debug: boolean;
  //========================================
  /**
   * @public
   * @description 获取 / 创建一个专属缓存对象
   * @param {string} masterKey [required] 存储的主键名
   * @param {number} invalidateTime [optional] 缓存失效时间，默认为`0ms`
   * @param {boolean} isSync [optional] 是否使用同步方式存取，默认`false`，使用异步方式存取
   *
   * @return {StorageInfo} 专属缓存对象，可复用，用来多次进行存取数据。
   */
  export function gainStorage(masterKey: string, invalidateTime?: number, isSync?: boolean): StorageInfo;
  /**
   * @public
   * @description 创建一个专属缓存对象
   * @param {string} masterKey [required] 存储的主键名
   * @param {Number} invalidateTime [optional] 缓存失效时间，默认为`0ms`
   * @param {Boolean} isSync [optional] 是否使用同步方式存取，默认`false`，使用异步方式存取
   *
   * @return {StorageInfo} 专属缓存对象，可复用，用来多次进行存取数据。
   */
  export function createStorage(masterKey: string, invalidateTime?: number, isSync?: boolean): StorageInfo;
  /**
   * @public
   * @description 检查并删除所有过期数据
   */
  export function checkInvalidate(): void;
  /**
   * @public
   * @description 删除某一个masterKey下的所有缓存数据, 不论是否过期
   * @param {string} masterKey [required] 主键名
   */
  export function deleteDataByMasterKey(masterKey: string): void;
  /**
   * @public
   * @description 删除所有缓存
   * > 使用前，慎重思考需不需要
   */
  export function clearAll(): void;
  /**
   * @public
   * @description 便捷存储方式
   * @param {String} masterKey [required] 主键名
   * @param {Number | String} invalidateTime [required] 存储数据的持续时间段
   * @param {any[]} params [required] 参数集合
   * @param {any} data [optional] 存储的值
   * @param {(error: object, result: object) => void} cb [optional] 回调函数，`function(error,result){}`
   */
  export function quickSave(
    masterKey: string,
    invalidateTime: (number | string),
    params: any[],
    data: any,
    cb:(error: object, result: object) => void
  ): void;
  /**
   * @public
   * @description 便捷读取方式
   * @param {String} masterKey [required] 主键名
   * @param {Array} params [required] 参数集合
   * @param {Function} cb [optional] 回调函数，`function(error,result){}`
   */
  export function quickRead(masterKey: string, params: any[], cb?: (error: object, result: any) => void): void;
  /**
   * @public
   * @description 合成用于存储的键名,键名不仅可用于存储，读取，还可以用于主动删除缓存
   * @param { masterKey } masterKey [required] 主键名
   * @param { params } params [required] 参数集合
   * @returns {string}
   */
  export function combineSaveKey(masterKey: string, params: any[]): string;
}

export default Storage;
