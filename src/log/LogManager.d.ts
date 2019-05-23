
declare namespace Log {
  export let debug: boolean;
  export const logList: any[];
  /**
   *  @public
   *
   * @description 输出普通日志
   */
  export function trace(...args: any[]): void;
  /**
   *  @public
   *
   * @description 输出信息日志
   */
  export function info(...args: any[]): void
  /**
   *  @public
   *
   * @description 输出错误日志
   */
  export function error(...args: any[]): void
  /**
   * @public
   *
   * @description 输出警告日志
   */
  export function warn(...args: any[]): void
}

export default Log;
