'use strict';

var results = {};
var resultsDep = new Deps.Dependency();

Template.provider.call = function() {
	var self = this;

	var options = {};

	Deps.nonreactive(function() {
		options.term = Session.get('searchTerm');
	});

	Meteor.call('providers/search', this.name, options, function(err, result) {
		if(err) {
			console.error(err);
			return;
		}

		results[self.name] = result;
		resultsDep.changed();
	});
};

Template.provider.results = function() {
	console.log(this);

	resultsDep.depend();

	return results[this.name];
};

Template.provider.availabilityBackground = function() {
	var label;

	switch(this.availability) {
		case App.status.AVAILABLE:
			label = 'bg-success';
			break;
		case App.status.TAKEN:
			label = 'bg-danger';
			break;
		default:
			label = 'bg-warning';
			break;
	}

	return label;
};

Template.provider.availabilityText = function() {
	var text;

	switch(this.availability) {
		case App.status.AVAILABLE:
			text = 'Available';
			break;
		case App.status.TAKEN:
			text = 'Taken';
			break;
		default:
			text = 'Unknown';
			break;
	}

	return text;
};