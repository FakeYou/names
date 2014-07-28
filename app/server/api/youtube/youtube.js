var https = Meteor.require('https');
var url = Meteor.require('url');
var Future = Npm.require('fibers/future');

app.api.youtube = {

	_key: 'AIzaSyDmiLJsQ3xTHRBufW13b3KzsErx9oDtdXE',

	search: function(term) {
		var future = new Future();

		var term = term.replace(/\ /g, '');

		var requestUrl = url.format({
			protocol: 'https',
			host: 'www.googleapis.com',
			pathname: 'youtube/v3/channels',
			query: {
				part: 'snippet',
				forUsername: term,
				key: app.api.youtube._key
			}
		});

		app.api._base.httpsGet(requestUrl, function(err, result) {
			var result = JSON.parse(result);
			var names = [];

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

}
