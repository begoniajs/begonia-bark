
/**
 * @description 通用对象池类
 * @version 1.0.0
 * @author Brave Chan
 */
declare class Pool {
  /**
   * @description 构造函数
   * @param {(...args: any[]) => void} CLASS_FN [required] 一个类型的构造函数
   */
  constructor(CLASS_FN: (...args: any[]) => void): void;
  /**
   * @public
   * @description 创建一定数目的对象进入对象池
   * @param {number} num 对象的数量
   * @returns {Array}
   */
  create(num: number): any[];
  /**
   * @public
   * @description 获取一个对象池中的对象
   * @returns {any}
   */
  gain(): any;
  /**
   * @public
   * @description 返还一个对象到对象池中
   * @param {any} obj
   */
  back(obj: any): void;
  /**
   * @public
   * @description 返还一组对象
   * @param {any[]} objList
   */
  backMany(objList: any[]): void;
  /**
   * @public
   * @description 清洗对象(重置到默认状态),可被子类重写
   * @param {any} obj
   * @returns {any}
   */
  wash(obj: any): any;
  /**
   * @public
   * @readonly
   * @description 对象池容量
   * @returns {number}
   */
  readonly length: number;
  /**
   * @public
   * @readonly
   * @description 对象池是否为空
   * @returns {boolean}
   */
  readonly isEmpty: boolean;
}

export default Pool;