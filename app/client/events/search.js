'use strict';

Template.search.events({
	'submit form[name=search]': function submitSearchForm(e) {
		e.preventDefault();

		var $form = $(e.target);
		var value = $form.find('input[name=search]').val();

		App.categories.internet(value);
	}
});