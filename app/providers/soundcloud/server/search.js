'use strict';

var url    = Meteor.require('url');
var Future = Npm.require('fibers/future');

App.providers.soundcloud.search = function(term) {
	var future = new Future();

	term = term.replace(/\ /g, '');

	var requestUrl = url.format({
		protocol: 'https',
		host:     'api.soundcloud.com',
		pathname: 'users',
		query:    {
			q:         term,
			client_id: App.providers.soundcloud._clientId,
			limit:     5
		}
	});

	App.providers._base.httpsGet(requestUrl, function(err, result) {
		var names = [];

		result = App.providers._base.parseXml(result);

		if(_.isUndefined(result.users.user)) {
			names.push({
				name:         term,
				availability: App.status.AVAILABLE,
				url:          url.format({
					protocol: 'https',
					host:     'soundcloud.com',
					pathname: term
				})
			});
		}
		else {
			names = _.map(result.users.user, function(item) {
				return {
					name:         item.username[0],
					availability: App.status.TAKEN,
					url:          item['permalink-url'][0]
				};
			});
		}

		future.return(names);
	});

	return future.wait();
};
