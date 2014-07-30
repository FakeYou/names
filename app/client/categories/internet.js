'use strict';

App.categories.internet = function(term) {
	var options = {
		term: term
	};

	console.log(options);

	Meteor.call('api/domainr/search', options, function(err, result) {
		console.log(result);
	});
};