'use strict';

Meteor.startup(function() {
	App.categories = {
		internet: {
			name: 'internet',
			providers: [
				App.providers.domainr
			]
		},
		video: {
			name: 'video',
			providers: [
				App.providers.youtube
			]
		}
	};
})