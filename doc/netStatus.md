## 网络环境状态

### 用途

用于检测网络环境的状态，以及监控网络环境的状态，可以利用此功能提示用户等。

### 使用

```js
import NetStatus from 'bebark/net/NetService';
```

### API

#### 检测网络状态

```js
function goodNet(msg) {
  if (msg.isWarning) {
    // output some warning log
  }

  // handle for good net env.
  let type = msg.type; // 2g / 3g / 4g / wifi / unkonw
}

function badNet(msg) {
  let title = msg.title;
  let detail = msg.content;

  // alert the error;
}

NetStatus.checkNet(goodNet, badNet);
```

#### 监控网络状态

```js
function goodNet(msg, isWatch) {
  if (msg.isWarning) {
    // output some warning log
  }

  if (isWatch) {
    // eg: output msg "online now!" 
  }

  // handle for good net env.
  let type = msg.type; // 2g / 3g / 4g / wifi / unkonw
}

function badNet(msg, isWatch) {
  let title = msg.title;
  let detail = msg.content;

  if (isWatch) {
    // eg: output msg "offline now!"
  }

  // alert the error;
}

NetStatus.watchNet(goodNet, badNet);
```

#### 开启/关闭 debug模式

```js
NetStatus.debug = true; // or else
```
