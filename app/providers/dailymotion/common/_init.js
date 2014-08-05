'use strict';

App.logger.info('[providers] adding dailymotion provider.');

App.providers.dailymotion = {
	name: 'dailymotion',
	website: 'http://www.dailymotion.com/',
	category: 'video'
};

if(Meteor.isServer) {
}