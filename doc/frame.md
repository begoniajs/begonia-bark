## 帧模拟

### 用途

- 在制作交互动画中，需要相对固定的时间间隔进行帧画面处理。
- 在制作canvas动画中，需要每帧对画面进行更新。

### 使用

```js
import Frame from 'bebark/frame/FrameLite';

```

### API

假设我们有一个帧处理业务的函数:

```js
function handleFrame(duration) {
  // do something
  // The param duration is the number that between the previous frame and the next frame.
}

```

#### 添加帧监听

```js
Frame.addFrame(handleFrame);

```

#### 移除帧监听

```js
Frame.removeFrame(handleFrame);

```

#### 是否使用了此回调函数对帧进行了侦听

```js
Frame.hasFrame(handleFrame);
```

#### 结束帧循环

```js
Frame.stopFrame();
```

在添加一个帧处理器之后，帧管理对象会自动启动帧循环，并在所有帧处理器都被移除之后，停止帧循环。
所以，其实并不用手动停止帧循环。此处的方法提供了手动停止的途径，作为在特殊处理时使用。

#### 开始帧循环

```js
Frame.startFrame();
```

在添加一个帧处理器之后，帧管理对象会自动启动帧循环，并在所有帧处理器都被移除之后，停止帧循环。
所以，其实并不用手动停止帧循环。此处的方法提供了手动开启的途径，作为在特殊处理时使用。

#### 设置帧率fps

```js
Frame.fps = 60; // 默认
```

帧率会影响帧循环的时间间隔

#### 开启/关闭 debug模式

```js
Frame.debug = true; // 开启
Frame.debug = false; // 关闭
```

debug主要用于开发阶段，打开debug模式，将会在调试工具的控制台输出日志。

#### 销毁

释放资源，不可再用

```js
Frame.destroy();
```
