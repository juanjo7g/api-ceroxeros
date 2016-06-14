var supertest = require("supertest");
var should = require("should");

var PUERTO = process.env.PORT || 8080;
var server = supertest.agent("http://localhost:" + PUERTO);

describe("Prueba Unitaria services/configuration.js",function(){
  this.timeout(3000);

  it("Prueba metodo post sin modo, intensidad y cantidad",function(done){
    var body = {};
    server
    .post("/api/v1/qualification/post")
    .type('form')
    .send(body)
    .expect(400)
    .end(function(err,res){
      res.status.should.equal(400);
      done();
    });
  });

});
