'use strict';

var path = Meteor.require('path');

App.logger = Winston;
App.logger.remove(Winston.transports.Console);

App.logger.addColors({
	info: 'bold green',
	warn: 'inverse yellow',
	error: 'inverse red'
});

App.logger.add(Winston.transports.File, {
	filename: path.join(App.settings.dirs.logs, 'app.log'),
	level: 'warn'
});

App.logger.add(Winston.transports.Console, {
	colorize: true
});

App.logger.info('[init] Logger started.');
