# egg-aliyun-tablestore

（推荐）阿里云表格存储（Tablestore）插件，用于 Egg.js 框架。



## 介绍

本插件的工作只是将表格存储（Tablestore）官方 Node.js SDK 挂载到 Egg.js 框架上，使其能够被便捷地使用。对于表格存储的内部方法，请查看官方文档。


文档地址：https://help.aliyun.com/document_detail/56350.html




## 安装

```bash
$ npm i egg-aliyun-tablestore
```



## 配置

通过 `config/plugin.js` 配置启动 `egg-aliyun-tablestore` 插件:

```js
exports.tablestore = {
  enable: true,
  package: 'egg-aliyun-tablestore',
}
```

在 `config/config.${env}.js` 配置各个环境的实例信息。


### 单实例配置

```js
exports.tablestore = {
  // 单实例配置，注意对象属性名为 client，请将 xxxxxxxxxxxx 替换成实际的内容
  client: {
    /** AccessKey ID，必填 */
    accessKeyId: 'xxxxxxxxxxxx',

    /** AccessKey Secret，必填 */
    accessKeySecret: 'xxxxxxxxxxxx',

    /** endpoint 地址，必填 */
    endpoint: 'xxxxxxxxxxxx',

    /** 实例名称，必填 */
    instancename: 'xxxxxxxxxxxx',

    /** 最大重试次数，默认20次，选填 */
    maxRetries: 20,
  },

  /** 是否加载到 app 上，默认开启 */
  app: true,

  /** 是否加载到 agent 上，默认关闭 */
  agent: false,
}
```


### 多实例配置

```js
exports.tablestore = {
  // 多实例配置，注意对象属性名为 clients，底下包含多个对象，一个对象为一个实例，对象的属性名用于后面获取实例
  clients: {
    ots1: {
      // 实例内部属性与单实例模式相同
      accessKeyId: 'xxxxxxxxxxxx',
      accessKeySecret: 'xxxxxxxxxxxx',
      endpoint: 'xxxxxxxxxxxx',
      instancename: 'xxxxxxxxxxxx',
      maxRetries: 20,
    },

    ots2: {
      // 实例内部属性与单实例模式相同
      accessKeyId: 'xxxxxxxxxxxx',
      accessKeySecret: 'xxxxxxxxxxxx',
      endpoint: 'xxxxxxxxxxxx',
      instancename: 'xxxxxxxxxxxx',
      maxRetries: 20,
    },
    // ... 其他实例

  },

  /** 所有实例配置的默认值 */
  default: {
    // 多个实例中共同的属性可以抽出来放在这里，一般没必要
  },

  /** 是否加载到 app 上，默认开启 */
  app: true,

  /** 是否加载到 agent 上，默认关闭 */
  agent: false,
}
```



## 使用

单实例模式和多实例模式在使用上优点差异，请查看以下使用方式。

### 单实例使用

单实例下，可以直接访问 `app` 的 `tablestore` 属性或者 `ots` 属性访问实例。（ `ots` 是 `tablestore` 的别名，两者完全一致，建议使用 `ots` ，因为更简短。）

```js
// callback 方式调用
app.tablestore.listTable({}, function (err, data) {
  if (err) {
    console.log('error:', err)
    return
  }
  console.log('success:', data)
})

// 或者使用 ots 属性访问（下同）
app.ots.listTable({}, function (err, data) {
  if (err) {
    console.log('error:', err)
    return
  }
  console.log('success:', data)
})

// promise 方式调用
async ()=>{
  const data = await app.ots.listTable({})
  console.log(data)
}
```


### 多实例使用

多实例使用方式和单实例类似，只是获取实例的方式变了，原来可以直接访问 `app.ots` 获取实例，变更为 `app.ots.get(otsName)` 获取。

```js
const client1 = app.ots.get('ots1')
```
