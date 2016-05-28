var supertest = require("supertest");
var should = require("should");

var PUERTO = process.env.PORT || 8080;
var server = supertest.agent("http://localhost:" + PUERTO);

describe("Prueba Unitaria services/user.js",function(){
  this.timeout(5000);

  it("Prueba metodo login sin usuario y contraseña valido",function(done){
    server
    .get("/api/v1/user/login")
    .expect(401)
    .end(function(err,res){
      res.status.should.equal(401);
      done();
    });
  });

  it("Prueba metodo login con usuario y contraseña valido",function(done){
    server
    .get("/api/v1/user/login?username=test&password=test")
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });

  it("Prueba metodo login con usuario invalido",function(done){
    server
    .get("/api/v1/user/login?username=testinvalido&password=test")
    .expect(401)
    .end(function(err,res){
      res.status.should.equal(401);
      done();
    });
  });

  it("Prueba metodo login con contraseña invalida",function(done){
    server
    .get("/api/v1/user/login?username=test&password=testinvalido")
    .expect(401)
    .end(function(err,res){
      res.status.should.equal(401);
      done();
    });
  });

  it("Prueba metodo post sin usuario y contraseñas",function(done){
    var body = {};
    server
    .post("/api/v1/user/post")
    .type('form')
    .send(body)
    .expect(400)
    .end(function(err,res){
      res.status.should.equal(400);
      done();
    });
  });

  it("Prueba metodo post con usuario y sin contraseñas",function(done){
    var body = { username : 'test' };
    server
    .post("/api/v1/user/post")
    .type('form')
    .send(body)
    .expect(400)
    .end(function(err,res){
      res.status.should.equal(400);
      done();
    });
  });

  it("Prueba metodo post con usuario y contraseñas que no coinciden",function(done){
    var body = { username : 'test', password1 : 'test1', password2 : 'test2' };
    server
    .post("/api/v1/user/post")
    .type('form')
    .send(body)
    .expect(400)
    .end(function(err,res){
      res.status.should.equal(400);
      done();
    });
  });

  it("Prueba metodo post con usuario existente",function(done){
    var body = { username : 'test', password1 : 'test', password2 : 'test' };
    server
    .post("/api/v1/user/post")
    .type('form')
    .send(body)
    .expect(400)
    .end(function(err,res){
      res.status.should.equal(400);
      done();
    });
  });

});
