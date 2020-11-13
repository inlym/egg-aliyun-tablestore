# egg-aliyun-tablestore

[![npm version](https://img.shields.io/npm/v/egg-aliyun-tablestore)](https://www.npmjs.com/package/egg-aliyun-tablestore)  [![MIT](https://img.shields.io/npm/l/egg-aliyun-tablestore)](https://github.com/inlym/egg-aliyun-tablestore/blob/master/LICENSE)  [![npm](https://img.shields.io/npm/dw/egg-aliyun-tablestore)](https://www.npmjs.com/package/egg-aliyun-tablestore)


![egg-aliyun-tablestore](https://img.inlym.com/13766eda453d41ab90154a41a2eb7847.jpg)



阿里云表格存储（Tablestore）插件，用于 Egg.js 框架。



## 目录

-   [介绍](#介绍)
-   [安装](#安装)
-   [使用](#使用)
    -   [启用插件](#启用插件)
    -   [配置方式](#配置方式)
    -   [使用说明](#使用说明)
-   [相关](#相关)
-   [作者](#作者)
-   [参与](#参与)
-   [许可证](#许可证)



## 介绍

本插件的工作只是将表格存储（Tablestore）官方 Node.js SDK 挂载到 Egg.js 框架上，使其能够被便捷地使用。对于表格存储的内部方法，请查看 [官方文档](https://help.aliyun.com/document_detail/56350.html?userCode=lzfqdh6g) 。



## 安装

按照通用的方式使用 npm 下载安装到你的项目下即可，无需全局安装。



安装命令：

```bash
$ npm i egg-aliyun-tablestore
```



## 使用

在使用前，请确保你已经阅读 Egg.js 框架关于**插件**的 [文档](https://eggjs.org/zh-cn/basics/plugin.html) 。



下面说明如何配置以及使用插件。



### 启用插件

在 `config/plugin.js` 文件中中声明启用 `egg-aliyun-tablestore` 插件：

```js
exports.tablestore = {
  /** 是否启用插件，true 为启用，false 为禁用 */
  enable: true,

  /** 指定插件使用的包，为 'egg-aliyun-tablestore' */
  package: 'egg-aliyun-tablestore',
}
```

在 `config/config.${env}.js` 配置各个环境的实例信息。



### 配置方式

根据实例数量分为 **单实例配置** 和 **多实例配置** 两种配置方式，使用上也略有不同。



#### 单实例配置

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

  /** 是否挂载到 app 上，默认开启，选填 */
  app: true,

  /** 是否挂载到 agent 上，默认关闭，选填 */
  agent: false,
}
```



如果你不清楚上述配置项是什么含义或者不知道应该填什么，请 [查看官方文档](https://help.aliyun.com/document_detail/56352.html?userCode=lzfqdh6g) 。



### 多实例配置

```js
exports.tablestore = {
  // 多实例配置，注意对象属性名为 clients，底下包含多个对象，一个对象为一个实例，对象的属性名用于后面获取实例
  clients: {
	/** 下面的 ots1 为自定义的实例名，用于后续获取实例，你可以自定义为任意名称 */
    ots1: {
      // 实例内部属性与单实例模式相同
      accessKeyId: 'xxxxxxxxxxxx',
      accessKeySecret: 'xxxxxxxxxxxx',
      endpoint: 'xxxxxxxxxxxx',
      instancename: 'xxxxxxxxxxxx',
      maxRetries: 20,
    },

    ots2: {
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

  /** 是否挂载到 app 上，默认开启，选填 */
  app: true,

  /** 是否挂载到 agent 上，默认关闭，选填 */
  agent: false,
}
```



### 使用说明

单实例模式和多实例模式在使用上存在差异，请查看以下使用方式。



#### 单实例使用方式

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



#### 多实例使用方式

多实例使用方式和单实例类似，只是 **获取实例的方式** 变了，原来可以直接访问 `app.ots` 获取实例，变更为 `app.ots.get(otsName)` 获取。

```js
const client1 = app.ots.get('ots1')
```



#### 获取原始类

静态属性、方法调用时，需要获取原始的 `TableStore` 类，可以使用访问 `app.TableStore` 来获取。



## 相关

以下是作者开发的 Egg.js 框架的插件系列，已用于作者的生产项目中，推荐使用。
-   [egg-apigw-tracer](https://github.com/inlym/egg-apigw-tracer) - ⚡ 适配 API 网关的 HTTP 请求示踪器，用于 Egg.js 框架
-   [egg-aliyun-tablestore](https://github.com/inlym/egg-aliyun-tablestore) - 🚚 阿里云表格存储（Tablestore）插件，用于 Egg.js 框架
-   [egg-load](https://github.com/inlym/egg-load) - 🚀 自动挂载第三方模块至 Egg.js 框架上



## 作者

我是 [inlym](https://www.inlym.com) ，一个产品经理和全栈开发者。



如果你有任何问题或者建议，欢迎联系我，以下是我的联系方式：

-   邮箱：inlym@qq.com
-   主页：[www.inlym.com](https://www.inlym.com)



## 参与

非常欢迎你能够参与这个项目的开发和维护。

你可以通过以下几种方式参与到项目中：

1.  提建议和需求。对于几句话就能说清楚的建议和需求，你可以直接 提一个 [New Issue](https://github.com/inlym/egg-aliyun-tablestore/issues/new) 。
2.  Fork 项目，修改代码，然后提交 Pull requests 。（提交前请检查务必通过 ESLint 检查）



## 许可证

本插件使用 [MIT](LICENSE) 许可证。
