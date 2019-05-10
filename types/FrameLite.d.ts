/**
 * @description 帧模拟
 */
declare namespace FrameLite {
  /**
   * @public
   * @description 设置debug模式
   * @returns {boolean}
   */
  export let debug: boolean;
  /**
   * @public
   * @description 帧率
   * @returns {boolean}
   */
  export let fps: number;
  /**
   * @public
   * @description 销毁，释放资源，不可再用
   */
  export function destroy(): void;
  /**
   * @public
   *
   * @description 添加帧监听
   * @param {(duration: number) => void} handler [required] 每帧更新的回调函数
   */
  export function addFrame(handler: (duration: number) => void): void;
  /**
   * @public
   * @description 移除帧监听
   *
   * @param {(duration: number) => void} handler [required] 移除对帧监听的回调函数
   */
  export function removeFrame(handler: (duration: number) => void): void;
  /**
   * @public
   *
   * @description 是否使用了此回调函数对帧进行了侦听
   * @param {(duration: number) => void} handler [required] 回调函数
   *
   * @return {Boolean} 使用了true，否则false
   */
  export function hasFrame(handler: (duration: number) => void): void;
  /**
   * @public
   *
   * @description 结束帧循环
   */
  export function stopFrame(): void;
  /**
   * @public
   *
   * @description 开始帧循环
   */
  export function startFrame(): void;
}

/**
 * @description 帧模拟
 */
export default FrameLite;
