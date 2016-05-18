var config = {};

// Inicializando arreglos.
config.web = {};
config.mongodb = {};
config.api = {};

config.web.PORT = process.env.WEB_PORT || 8080;

// URL mongodb:
config.mongodb.URL = "mongodb://heroku_tvrk3vjs:aa8n6j7frlk2oa3v70ea408l4i@ds019481.mlab.com:19481/heroku_tvrk3vjs";

// KEY api
config.api.KEY = "supersecretkey"

module.exports = config;
