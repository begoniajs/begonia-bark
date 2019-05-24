## 版本检查

### 用途

用于对用户设备上的微信小程序基础库和指定的基础库版本号之间进行检查。
将结果通过回调的形式返回，可以判断是否需要提示用户。

### 使用

```js
import VersionChecker from 'bebark/versionCheck/VersionChecker';

/**
 * @private
 * @description 检查版本是否可用
 * @param SDKVersion {string} [required] 小程序基础库版本
 * @param version {string} [required] 微信版本
 */
function checkVersion(SDKVersion, version) {
  if (!SDKVersion) {
    return Promise.resolve();
  }

  return new Promise(function(resolve, reject) {
    VersionChecker.check(SDKVersion, '2.3.0', function(err, res) {
      if (err) {
        wx.showModal({
          title: '请更新您的微信',
          content: `您当前的微信版本(${version})不能很好的运行本小程序，请您更新一下微信，非常感谢。`,
          showCancel: false,
          confirmText: '知道了'
        });
        return reject({
          isError: true,
          message: `SDKVersion(${SDKVersion}) too low`
        });
      }

      return resolve();
    });
  });
}

```

### API

#### 检查比较2个版本号

```js
function check(
  currentVersion: string,
  baseVersion: string,
  cb?: (err: null | any, res: null | boolean) => void
): void;
```
