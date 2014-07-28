var https = Meteor.require('https');
var http = Meteor.require('http');

app.api._base = {

	httpGet: function(url, cb) {
		var req = http.get(url, function(res) {
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
		var req = https.get(url, function(res) {
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

}