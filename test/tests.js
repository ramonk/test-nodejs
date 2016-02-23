var expect = require('Chai').expect;

describe('test server response', function () {
	var trackApplication = require("../trackApplication.js");
	var server = trackApplication.myServer.getServer();
  var request = require('request');

  before(function () {
    server.listen(8000);
  });

  after(function () {
    server.close();
  });
  
  // test 404 codes

	it('GET http://localhost:8000/ should return 404', function (done) {
	  request.get('http://localhost:8000/', function (err, res, body){
	    expect(res.statusCode).to.equal(404);
	    done();
	  });
	});
	
	it('GET http://localhost:8000/track/asdf should return 404', function (done) {
	  request.get('http://localhost:8000/track/asdf', function (err, res, body){
	    expect(res.statusCode).to.equal(404);
	    done();
	  });
	});
	
	it('GET http://localhost:8000/tracking should return 404', function (done) {
	  request.get('http://localhost:8000/tracking', function (err, res, body){
	    expect(res.statusCode).to.equal(404);
	    done();
	  });
	});
	
	it('GET http://localhost:8000/track/ should return 404', function (done) {
	  request.get('http://localhost:8000/track/', function (err, res, body){
	    expect(res.statusCode).to.equal(404);
	    done();
	  });
	});
	
	it('GET http://localhost:8000/?track should return 404', function (done) {
	  request.get('http://localhost:8000/?track', function (err, res, body){
	    expect(res.statusCode).to.equal(404);
	    done();
	  });
	});
	
	it('HEAD http://localhost:8000/track should return 404', function (done) {
	  request.head('http://localhost:8000/track', function (err, res, body){
	    expect(res.statusCode).to.equal(404);
	    done();
	  });
	});
	
	it('POST http://localhost:8000/track should return 404', function (done) {
	  request.post('http://localhost:8000/track', function (err, res, body){
	    expect(res.statusCode).to.equal(404);
	    done();
	  });
	});
	
	it('PUT http://localhost:8000/track should return 404', function (done) {
	  request.put('http://localhost:8000/track', function (err, res, body){
	    expect(res.statusCode).to.equal(404);
	    done();
	  });
	});
	
	// test 200 codes
	
	it('GET http://localhost:8000/track should return 200', function (done) {
	  request.get('http://localhost:8000/track', function (err, res, body){
	    expect(res.statusCode).to.equal(200);
	    done();
	  });
	});
	
	it('GET http://localhost:8000/track?test1=1 should return 200', function (done) {
	  request.get('http://localhost:8000/track?test1=1', function (err, res, body){
	    expect(res.statusCode).to.equal(200);
	    done();
	  });
	});
	
	it('GET http://localhost:8000/track?test1=1&test2=2 should return 200', function (done) {
	  request.get('http://localhost:8000/track?test1=1&test2=2', function (err, res, body){
	    expect(res.statusCode).to.equal(200);
	    done();
	  });
	});
	
	it('GET http://localhost:8000/track?test1=1&test2=2&count=5 should return 200', function (done) {
	  request.get('http://localhost:8000/track?test1=1&test2=2&count=5', function (err, res, body){
	    expect(res.statusCode).to.equal(200);
	    done();
	  });
	});
	
});

/*
not working, not finished

describe('test filesystem write', function () {
  var request = require('request');
  var sinon = require("sinon");

  before(function () {
    
  });

  after(function () {
    
  });
	
	it('GET http://localhost:8000/track?test1=1 should once call fs.appendFile', function (done) {
	  var trackApplication = require("../trackApplication.js");
	  var spy = sinon.spy(trackApplication.fs, 'appendFile');
		var server = trackApplication.myServer.getServer();
    server.listen(8000);
	  request.get('http://localhost:8000/track?test1=1');
	  spy.restore();
	  sinon.assert.calledOnce(spy);
	  server.close();
	});
	
});

*/