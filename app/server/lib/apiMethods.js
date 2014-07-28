Meteor.methods({
	'api/domainr/search': function domainrSearch(options) {
		return app.api.domainr.search(options.term);
	},

	'api/youtube/search': function youtubeSearch(options) {
		return app.api.youtube.search(options.term);
	}
});