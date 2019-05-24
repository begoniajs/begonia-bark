## 日志管理

### 用途

微信小程序提供了日志api，此处的日志管理主要是用来自定义日志和自定义日志的显示。
内部也**不是**对微信小程序日志api的封装。

### 使用

1. 导入模块

```js
import Log from 'bebark/log/LogManager'
```

2. 定义css
  
这里提供一个示例:

```css

.log-box {
  width: 100%;
}

.log__item {
  margin-bottom: 10rpx;
}

.item__title {
  width: 100%;
  min-height: 40rpx;
  font-size: 32rpx;
}

.item__detail {
  width: 100%;
  min-height: 88rpx;
  font-size: 24rpx;
}

.log__txt--info {
  background: rgba(92, 157, 237, 0.5);
}

.log__txt--info>.item__title {
  background: #4a8adb;
}

.log__txt--warn {
  background: rgba(254, 208, 84, 0.5);
}

.log__txt--warn>.item__title {
  background: #f7ba44;
}

.log__txt--error {
  background: rgba(240, 84, 102, 0.5);
}

.log__txt--error>.item__title {
  background: #db4455;
}

.log__txt--normal {
  background: rgba(255, 255, 255, 1);
}

.log__txt--normal>.item__title {
  background: #e7e9ef;
}

```

3. 定义view

这里提供一份示例:

```html
<view class="log-box">
  <view class="log__item {{item.className}}" wx:key="time" wx:for="{{logList}}">
    <view class="item__title">{{item.message}} {{item.time}}</view>
    <view class="item__detail">{{item.detail}}</view>
  </view>
</view>
```

4. 获取`logList`

```js
// page log ---> log.js

// ...
data: {
  logList: []
},
onLoad(options) {
  Log.trace("open log page...");
  
  // 把日志渲染出来，如果只用来发送到后台，可以不用渲染。
  this.setData({
    logList:Log.logList,
  });
}
// ...
```

### API

#### trace 输出普通日志

```js
Log.trace('which mehtod or function', 'happen what', 'other...');

```

#### info 输出信息日志

```js
Log.info('which mehtod or function', 'happen what', 'other...');

```

#### error 输出错误日志

```js
Log.error('which mehtod or function', 'happen what', 'other...');

```

#### warn 输出警告日志

```js
Log.warn('which mehtod or function', 'happen what', 'other...');

```

#### logList 获取日志集合

```js
let list = Log.logList;
```

#### 开启/关闭 debug

```js
Log.debug = true; // or false
```

在debug模式下，记录日志的同事，还会在开发者工具的控制台输出一条日志。其余console的对应是：

```
trace ---> console.log

warn ---> console.warn

info ---> console.info

error ---> console.error

```
