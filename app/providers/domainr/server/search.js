'use strict';

var url    = Meteor.require('url');
var Future = Npm.require('fibers/future');

App.providers.domainr.search = function(term) {
	var future = new Future();

	var requestUrl = url.format({
		protocol: 'https',
		host:     'domai.nr',
		pathname: 'api/json/search',
		query:    { q: term }
	});

	App.providers._base.httpsGet(requestUrl, function(err, result) {
		var domains = JSON.parse(result);

		var names = _.map(domains.results, function(domain) {
			var availability;

			switch(domain.availability) {
				case 'available': 
					availability = App.status.AVAILABLE;
					break;
				case 'taken': 
					availability = App.status.TAKEN;
					break;
				default:
					return;
			}

			return {
				name:         domain.domain + domain.path,
				availability: availability,
				url:          url.format({
					protocol: 'http',
					host:     domain.domain,
					pathname: domain.path
				})
			};
		});

		names = _.filter(names, function(name) { return !_.isUndefined(name); });

		future.return(names);
	});

	return future.wait();
};
