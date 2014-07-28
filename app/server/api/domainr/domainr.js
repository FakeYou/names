var https = Meteor.require('https');
var url = Meteor.require('url');
var Future = Npm.require('fibers/future');

app.api.domainr = {

	search: function(term) {

		var future = new Future();

		var requestUrl = url.format({
			protocol: 'https',
			host: 'domai.nr',
			pathname: 'api/json/search',
			query: { q: term }
		});

		app.api._base.httpsGet(requestUrl, function(err, result) {
			var domains = JSON.parse(result);

			var names = _.map(domains.results, function(domain) {
				if(domain.availability === 'tld') {
					return;
				}

				return {
					name: domain.domain + domain.path,
					availability: domain.availability,
					url: url.format({
						protocol: 'http',
						host: domain.domain,
						pathname: domain.path
					})
				};
			});

			names = _.filter(names, function(name) { return !_.isUndefined(name); });

			future.return(names);
		})

		return future.wait();
	}
};
