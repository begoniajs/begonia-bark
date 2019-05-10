
declare namespace Log {
  export let debug: boolean;
  /**
   *  @public
   *
   * @description 输出普通日志
   */
  export function trace(...args: string[]): void;
  /**
   *  @public
   *
   * @description 输出信息日志
   */
  export function info(...args: string[]): void
  /**
   *  @public
   *
   * @description 输出错误日志
   */
  export function error(...args: string[]): void
  /**
   * @public
   *
   * @description 输出警告日志
   */
  export function warn(...args: string[]): void
}

export default Log;
