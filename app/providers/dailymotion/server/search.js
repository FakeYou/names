'use strict';

var url    = Meteor.require('url');
var Future = Npm.require('fibers/future');

App.providers.dailymotion.search = function(term) {
	var future = new Future();

	term = term.replace(/\ /g, '');

	// https://api.dailymotion.com/users?fields=fans_total,screenname%2Cviews_total&search=vibe&sort=popular


	var requestUrl = url.format({
		protocol: 'https',
		host:     'api.dailymotion.com',
		pathname: 'users',
		query:    {
			search: term
		}
	});

	console.log(requestUrl);

	App.providers._base.httpsGet(requestUrl, function(err, result) {
		var names = [];
		
		result = JSON.parse(result);

		console.log(result);

		// if(result.items.length === 0) {
		// 	names.push({
		// 		name:         term,
		// 		availability: App.status.AVAILABLE,
		// 		url:          url.format({
		// 			protocol: 'http',
		// 			host:     'www.youtube.com',
		// 			pathname: 'user/' + term
		// 		})
		// 	});
		// }
		// else {
		// 	names = _.map(result.items, function(item) {
		// 		return {
		// 			name:         item.snippet.title,
		// 			availability: App.status.TAKEN,
		// 			url:          url.format({
		// 				protocol: 'http',
		// 				host:     'www.youtube.com',
		// 				pathname: 'channel/' + item.id
		// 			})
		// 		};
		// 	});
		// }

		future.return(names);
	});

	return future.wait();
};
