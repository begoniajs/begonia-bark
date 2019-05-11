interface IProxy {
  /**
   * @description 执行下一项
   * 当第一次执行时，是启动队列执行。
   */
  next: (...args: any[]) => void;
  /**
   * @description 出现错误
   * @param {object} error
   */
  error: (error: object) => void;
  /**
   * @description 结束队列的执行，直接打到完成状态
   */
  end: (...args: any[]) => void;
}

/**
 * @description 链式对象
 */
declare class Chain {
  /**
   * @description 构造函数
   * @param {Array<(proxy: IProxy) => void>} list [required] 需要进行链式执行的函数队列
   * @param {(err: (object | null), res?: any) => void} complete [optional] 执行完毕所有函数后的回调
   * 遵从`function(error[,data])`
   * - error 如果队列执行中发生错误，将作为第一个参数被返回
   * - data 如果最后一次调用`next()`传入了参数，参数将会作为回调函数的参数被返回
   * @param {object} scope [optional] 希望队列中的函数和回调函数中的this指向
   * @return {Chain}
   */
  constructor(
    list: Array<(proxy: IProxy) => void>,
    complete: (err: (object | null), res?: any) => void,
    scope?: object
  );
  /**
   * @description 此chain实例的完成状态
   * @returns {boolean}
   */
  readonly done: boolean;
  /**
   * @description 此chain实例此时的值
   * 如果队列中的函数有返回值，那么将会作为
   * 此chain此时的值。
   * @returns {any}
   */
  readonly value: any;
  /**
   * @description 执行下一项
   * 当第一次执行时，是启动队列执行。
   * @returns {Chain}
   */
  next(...args: any[]): Chain;
  /**
   * @description 出现错误
   * @param {object} error
   *
   * @returns {Chain}
   */
  error(error: object): Chain;
  /**
   * @description 结束队列的执行，直接打到完成状态
   */
  end(...args: any[]): void;
  /**
   * 重置
   * 重置之后的chain可以再被使用
   * @param {Array<(proxy: IProxy) => void>} list [required] 需要进行链式执行的函数队列
   * @param {(err: (object | null), res?: any) => void} complete [optional] 执行完毕所有函数后的回调
   * 遵从`function(error[,data])`
   * - error 如果队列执行中发生错误，将作为第一个参数被返回
   * - data 如果最后一次调用`next()`传入了参数，参数将会作为回调函数的参数被返回
   * @param {object} scope [required] 希望队列中的函数和回调函数中的this指向
   */
  reset(
    list: Array<(proxy: IProxy) => void>,
    complete?: (err: (object | null), res?: any) => void,
    scope?: object
  ): Chain;
  /**
   * @public
   * @description 销毁
   * 执行销毁后的chain可被赋值为null
   * 处于不可再用状态
   */
  destroy(): void;
}

/**
 * @description 获得一个chain对象
 * @param {Array<(proxy: IProxy) => void>} list [required] 需要进行链式执行的函数队列
 * @param {(err: (object | null), res?: any) => void} complete [optional] 执行完毕所有函数后的回调
 * 遵从`function(error[,data])`
 * - error 如果队列执行中发生错误，将作为第一个参数被返回
 * - data 如果最后一次调用`next()`传入了参数，参数将会作为回调函数的参数被返回
 * @param {object} scope [optional] 希望队列中的函数和回调函数中的this指向
 */
export default function getChain(
  list: Array<(proxy: IProxy) => void>,
  complete?: (err: (object | null), res?: any) => void,
  scope?: object
): Chain;
