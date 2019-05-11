/**
 * @description 网络状态相关服务
 * @author Brave Chan on 2017.8.24
 */
declare namespace NetService {
  export let debug: boolean;
  /**
   * @public
   *
   * @description 监控网络状态
   * @param {() => void} changeToGoodFn [optional] 网络变好时的回调
   * @param {() => void} changeToBadFn [optional] 网络变差是的回调
   */
  export function checkNet(changeToGoodFn: () => void, changeToBadFn: () => void): void;
  /**
   * @public
   *
   * @description 检测网络状态
   * @param {Function} goodFn [optional] 网络情况好时调用该回调
   * @param {Function} badFn [optional] 网络情况不好时调用该回调
   */
  export function watchNet(goodFn: () => void, badFn: () => void): void;
}

export default NetService;