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

	this.route('test', {
		path: '/test',
		layoutTemplate: null,
		template: 'test'
	})
});
