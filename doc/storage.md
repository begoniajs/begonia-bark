## 缓存管理

### 用途

缓存对于web产品的意义无需多言。对于节省性能（复杂重复的计算不必重复）、节约流量都具有很大的作用。

微信小程序中开放的缓存API，主要是针对持久缓存（数据持久化）。但对于数据的实际用途，根据不同的场景却不尽相同：

- 数据变化频繁
- 数据变化较慢，但不是不变
- 数据计算完毕，基本不会发生变化
- 无论改变与否；无论频繁与否，都是重要的留存数据。

显然，针对这些类型的数据，需要分别处理。因此需要一些缓存策略。

模块内部对微信小程序缓存api进行了封装，并提供了一些存储规则。

#### 缓存策略

缓存策略采用时间比对。
通过为每条缓存加入时间戳的方式，在读取、清理等功能时通过比对过期时间，判断保留与否。

#### 分级的过期时间

将过期时间段分成数个级别:

```js
const ZERO                  = 0;                            //0ms
const SHORTEST_INVALIDATE   = 900000;                       //15 minutes
const SHORTER_INVALIDATE    = 2*SHORTEST_INVALIDATE;        //half an hour
const SHORT_INVALIDATE      = 2*SHORTER_INVALIDATE;         //one hour
const LONG_INVALIDATE       = 3*SHORT_INVALIDATE;           //three hours
const LONGER_INVALIDATE     = 2*LONG_INVALIDATE;            //six hours
const LONGEST_INVALIDATE    = 4*LONGER_INVALIDATE;          //one day
const TOO_LONG_INVALIDATE   = 2*LONGEST_INVALIDATE;         //two days
const FOREVER               = 'forever';                    //forever
const TEST_INVALIDATE       = 10000;                        //ten seconds,only for debug and test
```

像这样将不同时间段保存成常量，在比对时间时，就可以进行过期判断了。

> 模块并没有限制必须使用内置的这些时间常量，因此可以根据项目的需要自己定义需要的过期时间段。

#### 缓存格式

每条缓存，遵循了一定的格式，这样处理的时候比较方便，由于缓存存储的方式是key-value形式，那么格式如下:

```
key ---> [param_1]:[param_2]: ... [param_n] : [masterKey]   //以冒号分隔
value ---> [saveTime] [SALT] [invalidateTime] [SALT] [data(string)]

```

##### 设置键名

键名，使用参数和`masterKey`的组合，以`:`分隔。
所谓`masterKey`是数据用途的识别主键，比如存储一条关于某个教师用户创建的所有班级信息的数据：

```js
//举例的数据
{
    userId:1,
    data:[
        {
            id:12,
            name:"高三一班",
            //...
        },
        //...
    ],
}
```
当前用户的`userId`为`1`，对应了一定数据`data`，我们设定他的`masterKey`为`groupList`(班级列表)，那么组成的可存储键名为:

```js
let masterKey = "1:groupList"

```

##### 设置value

之后，我们将`data`的数据变为`json`格式，那么存储在本地的存储对象中的键值对就是:

```js
{
    "1:groupList":"saveTime|SALT|invalidateTime|SALT|[...]"
}
```

其中：

- `saveTime`是存储数据时的时间戳
- `invalidateTime`是缓存的过期时间
- `SALT`(在`StorageManager`中为一个特定的字符串，目前暂不开放修改)是分隔时间戳和数据的标识

#### 判断是否过期

判断过期的公式是:

```
读取时间 - 存储时间 >= 设定的有效时间段
```

在每次读取数据时，会记录当前时间，通过比对缓存中的存储时间，决定是否使用数据，或者删除数据缓存。

#### 过期处理

`StorageManager`在管理缓存过期时有2种方式:

1. 在读取每条数据时，判断是否过期。如果过期就立即删除数据，反之，则返回缓存数据。
2. 提供了全部数据的检查方法，可以在系统空闲时、将要关闭时和长时间处于后台时，主动调用方法，进行缓存检查和清理。

### 使用

1. 导入模块
  
```js
import LS from 'bebark/storage/StorageManager';
```

2. 创建缓存对象

```js

let storage = LS.gainStorage('groupList', LS.SHORTEST_INVALIDATE);

let params = [1];
let data = [
  {
    id:12,
    name:"高三一班"
  }       
];

storage.save(
  params,
  data,
  // 回调函数可选，采用node.js风格
  function(err, result) {
    if (err) {
      console.error(err);
      return;
    }

    // save success
  }
);
```

3. 获取缓存对象再次进行存储

```js

// 由于前面已经创建了主键为`groupList`，所以此处仅仅是返回已有对象，而不会重复创建。
let storage = LS.gainStorage('groupList');

let params = [2];
let data = [
  {
    id:24,
    name:"高三二班"
  }       
];

storage.save(
  params,
  data,
  // 回调函数可选，采用node.js风格
  function(err, result) {
    if (err) {
      console.error(err);
      return;
    }

    // save success
  }
);

```

4. 读取数据

```js
let storage = LS.gainStorage('groupList');
let params = [2];
storage.read(
  params,
  // 必须有回调函数，采用node.js风格
  function(err, result) {
    if (err) {
      console.error(err);
      return;
    }

    // handle result data
  }
);
```

可以自行包装成`Promise`形式，但是模块仅提供回调形式。

### API

#### 获取 / 创建一个专属缓存对象

```js
function gainStorage(masterKey: string, invalidateTime?: number, isSync?: boolean): StorageInfo
```

- `masterKey` required 存储对象主键
- `invalidateTime` optional 过期时间,默认值是 0 ms
- `isSync` optional 是否采用同步方法 

#### 创建一个专属缓存对象

```js
function createStorage(masterKey: string, invalidateTime?: number, isSync?: boolean): StorageInfo
```

- `masterKey` required 存储对象主键
- `invalidateTime` optional 过期时间,默认值是 0 ms
- `isSync` optional 是否采用同步方法 

只是创建。**建议一直使用`gainStorage()`方法**

#### 检查并删除所有过期数据

```js
function checkInvalidate(): void;
```

#### 删除某一个masterKey下的所有缓存数据, 不论是否过期

```js
function deleteDataByMasterKey(masterKey: string): void;
```

- `masterKey` required 存储对象主键

#### 删除所有缓存

> 使用前，慎重思考需不需要

```js
function clearAll(): void;
```

#### 便捷存储方式

```js
function quickSave(
  masterKey: string,
  invalidateTime: (number | string),
  params: any[],
  data: any,
  cb:(error: object, result: object) => void
): void;
```

- `masterKey` required 存储对象主键
- `invalidateTime` required 过期时间,默认值是 0 ms
- `params` required 请求参数，没有就是[]
- `data` required 数据值
- `cb` optional 回调函数

快捷存储，其实就是使用同步的方式进行存储。
如果数据量比较小，可以采用此方法，快捷的存储数据值。

#### 便捷读取方式

```js
function quickRead(
  masterKey: string, 
  params: any[], 
  cb?: (error: object, result: any) => void
): void;
```
- `masterKey` required 存储对象主键
- `params` required 请求参数，没有就是[]
- `cb` optional 回调函数

快捷读取，其实就是使用同步的方式进行读取。
如果数据量比较小，可以采用此方法，快捷的读取数据值。

#### 合成用于存储的键名,键名不仅可用于存储，读取，还可以用于主动删除缓存

```js
function combineSaveKey(masterKey: string, params: any[]): string;
```

- `masterKey` required 存储对象主键
- `params` required 请求参数，没有就是[]
