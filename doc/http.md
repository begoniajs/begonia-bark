## https请求对象

### 用途

用来请求远程服务器数据，目前暂时提供`post`和`get`方法，其他方法在后续版本中添加。

请求对象对微信网络请求api进行了封装，并返回`Promise`形式。

### 使用

```js
import Request from 'bebark/http/Request';
```

### API

#### post

```js
let url = 'https://www.yourdomain.com/onedir/doSomething';
let data = {
  id: 123,
  name: '张三'
};
// 可选的
let other = {
  // 请留意“关于header”
  header: {
    'X-Token': 'wvweindew3f245223sx' // just a example
  }
};

Request.post(url, data, other)
  .then(function(res) {
    // 此处返回的res是经过处理的，请留意"关于返回值res"
  })
  .catch(function(err) {
    // 此处的err也是经过处理的，请留意"关于错误处理"

  });

```

#### get

```js
let url = 'https://www.yourdomain.com/onedir/doSomething';
let data = {
  id: 123,
  name: '张三'
};
// 可选的
let other = {
  // 请留意“关于header”
  header: {
    'X-Token': 'wvweindew3f245223sx' // just a example
  }
};

Request.get(url, data, other)
  .then(function(res) {
    // 此处返回的res是经过处理的，请留意"关于返回值res"
  })
  .catch(function(err) {
    // 此处的err也是经过处理的，请留意"关于错误处理"

  });
```

##### 关于header

可以自定header对象中的字段，但是需要注意，有一些字段是具有固有设置的。
例如：post请求的`'content-type': 'application/x-www-form-urlencoded'`就是固有设置。

如果您在自定义header时，又设置了`content-type`，那么在post请求时，这项设置将不会覆盖掉post固有设置。

##### 关于返回值res

此处返回的res是经过处理的对象，在方法内部，验证response和response.data是否存在。
并将response.data返回，因此可以理解为 内部的`response.data` === 返回的`res`。

##### 关于错误处理

错误对象`err`也是经过处理的对象。

对于请求成功，但是验证response时出错的请求，将会返回如下形式的错误对象

```js
{
  isError: boolean, // default true
  message: string, // error title
  detail: string | object | any
}
```
detail字段包含错误的response对象，用于输出或者debug

对于请求失败，则会在原始的error对象上附加`isError`字段，值为`true`。
其他字段保持原始不变。
