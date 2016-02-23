/* Vytvoøte aplikaci v Node.js, která
1) pøijímá HTTP GET požadavky jen na routì /track
2) z požadavku získá data pøedaná jako query string parametry
3) uloží data do souboru na lokálním disku jako JSON (append)
4) pokud se v datech vyskytuje parametr count, zvýší o jeho hodnotu položku s klíèem 'count' v databázi Redis
5) napište pøíslušné unit testy, které zvládnete */

var fs = module.exports.fs = require('fs');
var redis = module.exports.redis = require('redis');

var jsonLogFile = 'test.txt';

module.exports.myServer = {
	getServer: function() {
		var trackApplication = this;
		var sys = require('sys');
		var http = require('http');
		var url = require('url');
		var querystring = require('querystring');
		
		return http.createServer(function (request, response) {
			var urlParts = url.parse(request.url);
			if (request.method === 'GET' && urlParts.pathname === '/track') {
				var query = urlParts.query;
				var json = querystring.parse(query);
					
				trackApplication.appendJsonIntoFile(json);
				trackApplication.incrementCountInRedis(json.count);
			} else {
				response.statusCode = 404;
			}
			response.end();
			
		});	
	},
	appendJsonIntoFile: function(json) {
		fs.appendFile(jsonLogFile, JSON.stringify(json));	
	},
	incrementCountInRedis: function(count) {
    if (count !== undefined) {
			var client = redis.createClient();
			client.incrby('count', count);
		}
	}
};