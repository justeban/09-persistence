'use strict';

const router = require('./router.js');

const Note = require('../model/notes.js');

let sendJSON = (res, obj) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(obj));
  res.end();
};

let sendJSON204 = (res, obj) => {
  res.statusCode = 204;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(obj));
  res.end();
};

router.get('/api/v1/notes', (req, res) => {

  let id = req.url.query.id || null;

  if (id) {
    let note = new Note();
    note.fetchOne(id)
      .then(data => sendJSON(res, data))
      .catch(err => console.error(err));
  } else {
    let note = new Note();
    note.fetchAll()
      .then(data => sendJSON(res, data))
      .catch(err => console.error)
  }
});

router.post('/api/v1/notes', (req, res) => {

  let note = new Note(req.body);
  note.save()
    .then(data => sendJSON(res, data))
    .catch(err => console.log(err));

});

router.delete('/api/v1/notes', (req, res) => {
  let id = req.url.query.id || null;
  if (!id) { throw `${id} not found`}
  else {
    let note = new Note();
    note.delete(id)
      .then(data => sendJSON204(res, data))
      .catch(err => {
        res.statusCode = 500;
        res.statusMessage = 'Server Error';
        res.write('File Not Found');
        res.end();
      });
    }
});

module.exports = {};
