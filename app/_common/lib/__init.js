App = {};

if(Meteor.isServer && _.isEmpty(Meteor.settings)) {
	console.error('Settings not found, use --settings [file] to include settings for the app.');
	process.exit(0);
}

App.settings = Meteor.settings;

App.status = {
	AVAILABLE: 1,
	TAKEN:     2,
	UNSURE:    3,
	UNKNOWN:   4
};

App.providers = {};

if(Meteor.isClient) {
	App.logger = {};

	if(App.settings.public.environment === 'development') {
		App.logger.info = console.info.bind(console);
		App.logger.warn = console.warn.bind(console);
		App.logger.error = console.error.bind(console);
	}
	else {
		App.logger.info = function() {};
		App.logger.warn = function() {};
		App.logger.error = function() {};
	}
}