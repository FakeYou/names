'use strict';

var https = Meteor.require('https');
var http  = Meteor.require('http');
var xml2js = Meteor.require('xml2js');
var Future = Npm.require('fibers/future');

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
	},

	parseXml: function(xml) {
		var future = new Future();

		xml2js.parseString(xml, function(err, result) {
			if(err) {
				future.throw(err);
			}
			else {
				future.return(result);
			}
		});

		return future.wait();
	}

};