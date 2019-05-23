
declare namespace VersionChecker {
  /**
   * 检查比较2个版本号
   * @param {string} currentVersion [required] 当前版本
   * @param {string} baseVersion [required] 基础版本
   * @param {() => void} cb [optional] 版本安全结果回调
   */
  export function check(
    currentVersion: string,
    baseVersion: string,
    cb?: (err: null | any, res: null | boolean) => void
  ): void;
}

export default VersionChecker;
