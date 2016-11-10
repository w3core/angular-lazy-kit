'use strict';

var koa = require('koa');
var compose = require('koa-compose');
var serve = require('koa-static');
var send = require('koa-send');
var app = module.exports = koa();

var middlewareStack = [
  serve(__dirname),
  function* () {
    yield send(this, 'index.html');
  }
];

app.use(compose(middlewareStack));

app.listen(3000);