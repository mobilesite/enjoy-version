# enjoy-version

A version compare tool, which is useful in comparing versions of APPs and JavaScript modules.

## 安装

```bash
npm i enjoy-version
```

## 引入

```javascript
import { Version, libVersion } from 'enjoy-version';
```
## API

### libVersion

获得当前类库的版本号。

### Version

是一个类，可以用来创建一个版本对象，例如`new Version('1.2.3')`，将获得一个对象：`{"version":"1.2.3"}`。

`new Version('1.2.3')`产生的对象还有`gt(version)`、`gte(version)`、`lt(version)`、`lte(version)`、`eq(version)`这几个方法，可以将`new Version('1.2.3')`中的version属性 与 传入的version（版本字符串，如'1.0.0'）参数进行比较，判断版本的大小。返回的值是Boolean类型。

- `gt(version)`表示大于。

- `gte(version)`表示大于等于。

- `lt(version)`表示小于。

- `lte(version)`表示小于等于。

- `eq(version)`表示等于。

例如：

`new Version('1.2.3').gt('1.0.0')`为true;

`new Version('1.2.3').gte('1.2.0')`为true;

`new Version('1.2.3').lt('1.2.4')`为true;

`new Version('1.2.3').lte('1.2.4')`为true;

`new Version('1.2.3').eq('1.2.3')`为true。
