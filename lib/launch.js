'use strict'

const TableStore = require('tablestore')

function createOneClient(config, app) {
	const { accessKeyId, accessKeySecret, endpoint, instancename } = config

	if (accessKeyId && accessKeySecret && endpoint && instancename) {
		app.coreLogger.info(
			`[egg-aliyun-tablestore] TableStore实例配置信息: accessKeyId => ${accessKeyId}, accessKeySecret => ************, endpoint => ${endpoint}, instancename => ${instancename}`
		)
	} else {
		throw new Error(
			`[egg-aliyun-tablestore] 参数配置错误，请参照文档配置参数。您配置的参数为: accessKeyId => ${accessKeyId}, accessKeySecret => ${accessKeySecret}, endpoint => ${endpoint}, instancename => ${instancename}`
		)
	}

	const client = new TableStore.Client({
		accessKeyId,
		accessKeySecret,
		endpoint,
		instancename,
		maxRetries: config.maxRetries,
	})

	return client
}

module.exports = (app) => {
	app.addSingleton('tablestore', createOneClient)
	app.TableStore = TableStore
}
