'use strict';

Meteor.methods({
	'api/domainr/search': function domainrSearch(options) {
		return App.api.domainr.search(options.term);
	},

	'api/youtube/search': function youtubeSearch(options) {
		return App.api.youtube.search(options.term);
	}
});