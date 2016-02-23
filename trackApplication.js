/* Vytvo�te aplikaci v Node.js, kter�
1) p�ij�m� HTTP GET po�adavky jen na rout� /track
2) z po�adavku z�sk� data p�edan� jako query string parametry
3) ulo�� data do souboru na lok�ln�m disku jako JSON (append)
4) pokud se v datech vyskytuje parametr count, zv��� o jeho hodnotu polo�ku s kl��em 'count' v datab�zi Redis
5) napi�te p��slu�n� unit testy, kter� zvl�dnete */

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