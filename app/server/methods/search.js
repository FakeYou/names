'use strict';

Meteor.methods({
	'providers/search': function apiSearch(provider, options) {
		if(_.isUndefined(App.providers[provider])) {
			throw new Meteor.Error(400, 'Api provider not found');
		}

		return App.providers[provider].search(options.term);
	}
});