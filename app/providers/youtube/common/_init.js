'use strict';

App.providers.youtube = {
	name: 'youtube',
	website: 'https://www.youtube.com/',
	category: 'video'
};

if(Meteor.isServer) {
	App.providers.youtube._key = 'AIzaSyDmiLJsQ3xTHRBufW13b3KzsErx9oDtdXE';
}