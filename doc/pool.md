## 通用对象池

### 用途

主要用于复用相同的对象，达到内存使用管理的目的。

可以提供一个构造函数，以便生成一个专属的对象池。之后能够取，能够还，在超过一定时间后，对象池能够自动清空。

### 使用

1. 导入

```js
import Pool from 'bebark/pool/Pool';

```

2. 创建某个类的专属对象池

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let pointPool = new Pool(Point);

```

3. 创建一定量的实例

```js
pointPool.create(10); // create 10 instances in pool
```

4. 取出实例

```js
let point = pointPool.gain();
```

5. 返还实例

```js
pointPool.back(point);
```

### API

#### 设置清理对象池的时间

```js
pointPool.clearTime = 60000;
```

默认是2分钟(120000)清理一次

#### 创建一定数目的对象进入对象池

```js
let list = pointPool.create(10);
```

方法返回刚刚创建出来的对象所组成的数组。

#### 获取一个对象池中的对象

```js
let point = pointPool.gain();
```

#### 还一个对象到对象池中

```js
pointPool.back(point);
```

#### 返回一组对象

```js
pointPool.backMany([point, /*...*/]);
```

#### 清洗对象(重置到默认状态),可被子类重写

```js
pointPool.wash(point);
```

#### 对象池容量

```js
let num = pointPool.length; // read only
```

#### 对象池是否为空

```js
if (pointPool.isEmpty) {
  
}
```
