var supertest = require("supertest");
var should = require("should");

var token = '57402fa6bf7243aad27f6d82d79727b7cdd116fc4cb1d7cc316c4073b049ed4e95aef6195994a89d45c7630a423aac08481232e514e253382f1cd987632aa831';
var id_configuration = '';

var PUERTO = process.env.PORT || 8080;
var server = supertest.agent("http://localhost:" + PUERTO);

describe("Prueba Unitaria services/configuration.js",function(){
  this.timeout(5000);

  it("Prueba metodo get sin token",function(done){
    server
    .get("/api/v1/configuration/get")
    .expect(401)
    .end(function(err,res){
      res.status.should.equal(401);
      done();
    });
  });

  it("Prueba metodo get con token invalido",function(done){
    server
    .get("/api/v1/configuration/get?token=invalido")
    .expect(401)
    .end(function(err,res){
      res.status.should.equal(401);
      done();
    });
  });

  it("Prueba metodo get con token valido",function(done){
    server
    .get("/api/v1/configuration/get?token=" + token)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });

  it("Prueba metodo post sin token",function(done){
    var body = {};
    server
    .post("/api/v1/configuration/post")
    .type('form')
    .send(body)
    .expect(401)
    .end(function(err,res){
      res.status.should.equal(401);
      done();
    });
  });

  it("Prueba metodo post con token invalido",function(done){
    var body = { token : token + 'invalido' };
    server
    .post("/api/v1/configuration/post")
    .type('form')
    .send(body)
    .expect(401)
    .end(function(err,res){
      res.status.should.equal(401);
      done();
    });
  });

  it("Prueba metodo post con token, pero sin modo e intensidad",function(done){
    var body = { token : token };
    server
    .post("/api/v1/configuration/post")
    .type('form')
    .send(body)
    .expect(400)
    .end(function(err,res){
      res.status.should.equal(400);
      done();
    });
  });

  it("Prueba metodo post con token, con modo e intensidad",function(done){
    var body = { token : token, mode : 'a', intensity: 1};
    server
    .post("/api/v1/configuration/post")
    .type('form')
    .send(body)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      id_configuration= res.body.data._id;
      done();
    });
  });

  it("Prueba metodo delete sin token",function(done){
    var body = { };
    server
    .post("/api/v1/configuration/delete")
    .type('form')
    .send(body)
    .expect(401)
    .end(function(err,res){
      res.status.should.equal(401);
      done();
    });
  });

  it("Prueba metodo delete con token invalido",function(done){
    var body = { token : token + 'invalido'};
    server
    .post("/api/v1/configuration/delete")
    .type('form')
    .send(body)
    .expect(401)
    .end(function(err,res){
      res.status.should.equal(401);
      done();
    });
  });

  it("Prueba metodo delete con token valido y con id invalido",function(done){
    var body = { token : token };
    server
    .post("/api/v1/configuration/delete")
    .type('form')
    .send(body)
    .expect(404)
    .end(function(err,res){
      res.status.should.equal(404);
      done();
    });
  });

  it("Prueba metodo delete con token valido y con id valido",function(done){
    var body = { token : token, _id : id_configuration };
    server
    .post("/api/v1/configuration/delete")
    .type('form')
    .send(body)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });

});
