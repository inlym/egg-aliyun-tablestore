# egg-aliyun-tablestore

阿里云表格存储插件，用于 Egg.js 框架。


## 安装

```bash
$ npm i egg-aliyun-tablestore
```


## 配置

通过 `config/plugin.js` 配置启动 egg-aliyun-tablestore 插件:

```js
exports.tablestore = {
	enable: true,
	package: 'egg-aliyun-tablestore',
}
```

在 `config/config.${env}.js` 配置各个环境的表格存储实例连接信息：

### 单实例

```js
exports.tablestore = {
	// 单实例配置
	client: {
		// AccessKey ID
		accessKeyId: '<your access key id>',
		// AccessKey Secret
		accessKeySecret: '<your access key secret>',
		endpoint: '<your endpoint>',
		// 实例名称
		instancename: '<your instance name>',
		// 最大重试次数，默认20次
		maxRetries: 20,
	},
	// 是否加载到 app 上，默认开启
	app: true,
	// 是否加载到 agent 上，默认关闭
	agent: false,
}
```

使用方式：

```js
// 单实例直接通过 app.tablestore 访问
app.tablestore.putRow(params)
```


### 多数据源

```js
exports.tablestore = {
	clients: {
		// clientId, 获取client实例，需要通过 app.tablestore.get('clientId') 获取
		ots1: {
			// AccessKey ID
			accessKeyId: '<your access key id>',
			// AccessKey Secret
			accessKeySecret: '<your access key secret>',
			endpoint: '<your endpoint>',
			// 实例名称
			instancename: '<your instance name>',
			// 最大重试次数，默认20次
			maxRetries: 20,
		},

		ots2: {
			// AccessKey ID
			accessKeyId: '<your access key id>',
			// AccessKey Secret
			accessKeySecret: '<your access key secret>',
			endpoint: '<your endpoint>',
			// 实例名称
			instancename: '<your instance name>',
			// 最大重试次数，默认20次
			maxRetries: 20,
		},
	},
	// 所有实例配置的默认值
	default: {},

	// 是否加载到 app 上，默认开启
	app: true,
	// 是否加载到 agent 上，默认关闭
	agent: false,
}
```

使用方式：

```js
const client1 = app.tablestore.get('ots1')
client1.putRow(params)

const client2 = app.tablestore.get('ots2')
client2.putRow(params)
```
