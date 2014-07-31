'use strict';

var https = Meteor.require('https');
var http  = Meteor.require('http');

App.providers._base = {

	httpGet: function(url, cb) {
		http.get(url, function(res) {
			var chunks = [];

			res.on('data', function(chunk) {
				chunks.push(chunk);
			});

			res.on('end', function() {
				var result = Buffer.concat(chunks).toString();

				cb(null, result);
			});
		});
	},

	httpsGet: function(url, cb) {

		console.log(url);

		https.get(url, function(res) {
			var chunks = [];

			res.on('data', function(chunk) {
				console.log(chunk.toString());
				chunks.push(chunk);
			});

			res.on('end', function() {
				var result = Buffer.concat(chunks).toString();

				cb(null, result);
			});
		});
	}

};