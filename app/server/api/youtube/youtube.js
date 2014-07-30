'use strict';

var url = Meteor.require('url');
var Future = Npm.require('fibers/future');

App.api.youtube = {

	_key: 'AIzaSyDmiLJsQ3xTHRBufW13b3KzsErx9oDtdXE',

	search: function(term) {
		var future = new Future();

		term = term.replace(/\ /g, '');

		var requestUrl = url.format({
			protocol: 'https',
			host: 'www.googleapis.com',
			pathname: 'youtube/v3/channels',
			query: {
				part: 'snippet',
				forUsername: term,
				key: App.api.youtube._key
			}
		});

		App.api._base.httpsGet(requestUrl, function(err, result) {
			var names = [];
			
			result = JSON.parse(result);

			if(result.items.length === 0) {
				names.push({
					name: term,
					availability: 'available',
					url: url.format({
						protocol: 'http',
						host: 'www.youtube.com',
						pathname: 'user/' + term
					})
				});
			}
			else {
				names = _.map(result.items, function(item) {
					return {
						name: item.snippet.title,
						availability: 'taken',
						url: url.format({
							protocol: 'http',
							host: 'www.youtube.com',
							pathname: 'user/' + item.snippet.title
						})
					};
				});
			}

			future.return(names);
		});

		return future.wait();
	}

};
