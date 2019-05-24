# begonia-bark

## 介绍

begonia-bark是用于微信小程序开发的工具库。可以提供多项实用功能。
每项大功能都以模块的形式存在，并保持相对独立性。因此，既可以单独使用，也可以和begonia框架搭配使用。

> begonia-bark中的模块并非都是按照begonia规定的模块定义方式产生的增强模块，因此可以直接导入并使用，而不必使用begonia进行装载。

## 安装

#### 1. 首先使用npm进行安装

```
npm install bebark

```

#### 2. 小程序npm构建

使用微信小程序开发工具--->工具--->构建npm，进行npm包进行构建

#### 3. 导入包进行使用

以网络http请求对象为例：

```js
import Request from 'bebark/http/Request';

// post 请求
Request.post(url, data, {/* ...其他设置，例如header */})
  .then(function(res) {
    // do something
  })
  .catch(function(err) {
    // catch an error
  });

```

## 功能

begonia-bark目前提供如下功能，具体使用细节，可以查看相应的文档：

- [帧模拟 frame]('./doc/frame.md') 提供帧模拟循环，可以用来实现动画或者canvas动画帧循环
- [http请求对象 Request]('./doc/http.md') 对小程序http请求方法进行封装，并提供Promise形式返回。
- [log日志 LogManager]('./doc/log.md') 提供自定义形式的日志，每条日志为一个日志对象，并基于4种级别日志(trace, info, warn, error)提供相应的css类型，可自定义颜色等样式。
- [网络状态 NetService]('./doc/netStatus.md') 利用小程序api检测网络状态和监控网络状态
- [通用对象池 pool]('./doc/pool.md') 利用一个类的构造函数创建此类的专属对象池，通过管理对象获取和回收，控制内存使用。
- [缓存处理 StorageManager]('./doc/storage.md') 将小程序缓存api进行封装，提供特定的格式来存储数据的值、过期时间和参数等信息，并提供过期检查、过期删除等功能。
- [版本检测 versionCheck]('./doc/versionCheck.md') 通过对当前运行的环境的小程序基础库版本和指定的基础库版本进行对比，可以利用结果回调来判断是否应提示用户进行升级。
- [线程管理 WorkerManager]('./doc/worker.md') 封装了小程序worker的api，内置worker使用队列，并提供自动销毁自动切换线程任务的功能。

## license

MIT
