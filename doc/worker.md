## 线程管理

### 用途

用于管理小程序线程，提供线程池功能和任务队列，并能够自动销毁线程，自动切换后续任务。


### 使用

1. 导入

```js
import WM from 'bebark/worker/WorkerManager';
```

2. 注册(可选步骤)

作为begonia增强模块。

作为增强模块，WM只使用了2个模块声明周期`setup`和`destory`，用于启动和销毁，
并不会为小程序实例及其代理对象提供任何装饰性方法。

```js

import BE from 'begonia';

BE.use(WM, {
  // 将所有要用到worker注册到配置对象的workers字段下
  workers:{
    exam: 'workers/exam/ExamUtil.js',
    student: 'workers/student/StdUtil.js',
    user: 'workers/user/UserUtil.js',
    group: 'workers/group/GroupUtil.js'
  }
});

```

注册这一步是可以省略的。不过注册之后，就相当于在WM上创建了一个workers字段。
此后，使用worker时，可以直接使用workers对象上的属性来，快速访问worker地址（减少输入量，避免输入错误）

3. 使用某个worker

如果注册过，那么:  

```js

WM.message(WM.workers.user, {}, function(err, res) {
  if (err) {
    console.error(err);
    return;
  }

  // handle result
});

```

如果没注册过，那么:

```js
WM.message('workers/group/GroupUtil.js', {}, function(err, res) {
  if (err) {
    console.error(err);
    return;
  }

  // handle result
});
```

无论哪种方式，都可以进一步包装并返回`Promise`:

```js
function send(data) {
  return new Promise(function(resolve, reject) {
    WM.message(WM.workers.user, data, function(err, res) {
      if (err) {
        console.error(err);
        return reject(err);
      }

      // handle result
      return resolve(res);
    });
  });
}
```

#### 连续使用同一`workerKey`的worker(`v 1.0.7`)

由于微信小程序可被开发者自行创建的worker目前最大数量为1。
所以在使用完一项服务之后，需要先关闭worker，然后才能开启下一个。

但是如果使用的是同一个线程服务，只是每次的消息（功能）不同，那么在以往连续使用就意味着连续创建。
这显然是会造成不少消耗的。因此在`1.0.7`增加了连续使用同一worker不进行销毁的功能。

如果连续使用同一个worker，那么不再重新创建新的worker，而是复用原来的。
但是如果前后的两个worker的key不相同（即使用了不同的worker服务），一定会先将使用完成的worker销毁，然后再去创建新的。

> 所谓workerKey就是注册worker时使用的值，也就是worker的加载路径

### API

#### 向worker发送消息

```js
function message(workerKey: string, data?: object, cb?: (err: object, res: any) => void): void;
```

- workerKey [required] 要使用的worker的键名
- data [optional] 发送的消息数据对象
- cb [optional] 结果回调函数

#### 清空所有的workers

```js
function clearWorkers(): void;
```

#### 动态注册一个worker

```js
function rejester(opt: object): void;
```
- opt 新的worker的配置，形式为：

```js
{
  ['worker key']: 'worker path'
}
```

#### 应用配置文件

```js
function config(config: object): void;
```

#### 开启/关闭 debug模式

```js
WM.debug = true; // or else
```

#### 查询当前正在工作的线程

```js
let name = WM.currentWorkerKey;
```

#### 查询WorkerManager是否正在工作中

```js
let isWorking = WM.working;
```

#### 获取注册的worker列表

```js
let workers = WM.workers;
```

#### 获取所有已经注册的worker标识集合

```js
let ary = WM.workerKeys;
```
