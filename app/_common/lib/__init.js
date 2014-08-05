App = {};

App.status = {
	AVAILABLE: 1,
	TAKEN:     2,
	UNSURE:    3,
	UNKNOWN:   4
};

App.providers = {};

App.settings = Meteor.settings;

if(Meteor.isClient) {
	App.logger = {};
	App.logger.info = console.info.bind(console);
	App.logger.warn = console.warn.bind(console);
	App.logger.error = console.error.bind(console);
}