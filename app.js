'use strict'

const launch = require('./lib/launch.js')

module.exports = (app) => {
	if (app.config.tablestore.app) {
		launch(app)
	}
}
