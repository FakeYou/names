'use strict';

var https = Meteor.require('https');
var http = Meteor.require('http');

App.api._base = {

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
		https.get(url, function(res) {
			var chunks = [];

			res.on('data', function(chunk) {
				chunks.push(chunk);
			});

			res.on('end', function() {
				var result = Buffer.concat(chunks).toString();

				cb(null, result);
			});
		});
	}

};