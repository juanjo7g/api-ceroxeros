var supertest = require("supertest");
var should = require("should");

// Todo: obtener token haciendo una petición
var token = '57402fa6bf7243aad27f6d82d79727b7cdd116fc4cb1d7cc316c4073b049ed4e95aef6195994a89d45c7630a423aac08481232e514e253382f1cd987632aa831';

var PUERTO = process.env.PORT || 8080;
var server = supertest.agent("http://localhost:" + PUERTO);

describe("Prueba Unitaria routes.js",function(){
  this.timeout(3000);

  it("Prueba metodo GET sin token",function(done){
    server
    .get("/test")
    .expect(401)
    .end(function(err,res){
      res.status.should.equal(401);
      done();
    });
  });

  it("Prueba metodo POST sin token",function(done){
    server
    .post("/test")
    .expect(401)
    .end(function(err,res){
      res.status.should.equal(401);
      done();
    });
  });

  it("Prueba metodo DELETE sin token",function(done){
    server
    .delete("/test")
    .expect(401)
    .end(function(err,res){
      res.status.should.equal(401);
      done();
    });
  });

  it("Prueba metodo GET con token valido",function(done){
    server
    .get("/test?token=" + token)
    .expect(404)
    .end(function(err,res){
      res.status.should.equal(404);
      done();
    });
  });

  it("Prueba metodo POST con token valido",function(done){
    var body = { token: token };
    server
    .post("/test")
    .type('form')
    .send(body)
    .expect(404)
    .end(function(err,res){
      res.status.should.equal(404);
      done();
    });
  });

  it("Prueba metodo DELETE con token valido",function(done){
    var body = { token: token };
    server
    .delete("/test")
    .type('form')
    .send(body)
    .expect(404)
    .end(function(err,res){
      res.status.should.equal(404);
      done();
    });
  });

});
