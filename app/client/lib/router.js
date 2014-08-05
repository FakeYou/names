'use strict';

Router.configure({
  layoutTemplate: 'layout',
  // notFoundTemplate: 'notFound',
  // loadingTemplate: 'loading'
});

Router.map(function() {
	this.route('search', {
		path: '/',
		template: 'search'
	});
});
