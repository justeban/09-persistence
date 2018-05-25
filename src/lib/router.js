'use strict';

 const parser = require('./parser.js');
 
 const router = module.exports = {};

 router.routes = {};

 const methods = ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'];

 methods.forEach((method) => {
  router.routes[method] = {};
  router[method.toLowerCase()] = function (path, callback) {
    router.routes[method][path] = callback;
  };
 });

 router.route = (req, res) => {
  return parser(req)
    .then( req => {
      let handler = router.routes[req.method][req.url.pathname];
      if (handler) {
        return handler(req, res);
      }
    })
    .catch(err => {
      console.err('NOT_FOUND', req.url.pathname, 'and method: ' + req.method);
      res.writeHead(404);
      res.end();
    });
 };