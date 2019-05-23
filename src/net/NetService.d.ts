interface IGoodNet {
  // 网络状态
  type: string,
  // 是否是警告信息
  isWarning?: boolean,
  // 信息的标题，仅在警告信息时存在
  title?: string,
  // 信息的详情，仅在警告信息时存在
  content?: string,
  // 是否在监控状态
  isWatch?: boolean
}

interface IBadNet {
  // 错误标题
  title: string,
  // 问题详情
  content?: string,
  // 是否在监控状态
  isWatch?: boolean
}

/**
 * @description 网络状态相关服务
 * @author Brave Chan on 2017.8.24
 */
declare namespace NetService {
  /**
   * @public
   *
   * @description 开启/关闭 debug模式
   */
  export let debug: boolean;
  /**
   * @public
   *
   * @description 监控网络状态
   * @param {(msg: IGoodNet) => void} goodFn [optional] 网络变好时的回调
   * @param {(msg: IBadNet) => void} badFn [optional] 网络变差是的回调
   */
  export function checkNet(goodFn: (msg: IGoodNet) => void, badFn: (msg: IBadNet) => void): void;
  /**
   * @public
   *
   * @description 检测网络状态
   * @param {(msg: IGoodNet) => void} goodFn [optional] 网络情况好时调用该回调
   * @param {(msg: IBadNet) => void} badFn [optional] 网络情况不好时调用该回调
   */
  export function watchNet(goodFn: (msg: IGoodNet) => void, badFn: (msg: IBadNet) => void): void;
}

export default NetService;
