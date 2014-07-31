'use strict';

Template.search.categories = function() {
	var term = Session.get('searchTerm');

	if(term) {
		return _.values(App.categories);
	}
};