'use strict';

const fs = require('fs');

const storage = module.exports = {};

const dataDirectory = `${__dirname}/../../data`;

const database = {}

storage.fetchAll = () => {
  return new Promise((resolve, reject) => {
    let directory = dataDirectory;
    fs.readdir(directory, (err, files) => {
      if (err) { reject(err); }
      else { 
        files.forEach( (el) => {

          let id = el.replace(/\.json/, '');

          fs.readFile(`${directory}/${id}.json`, (err, data) => {
            if (err) { reject(err); }
            else {
              database[id] = JSON.parse(data.toString());
              
            }
          });
        })
        
        
      }
    });
  });

};

storage.fetchOne = (id) => {
  return new Promise((resolve, reject) => {
    let file = `${dataDirectory}/${id}.json`;
    fs.readFile(file, (err, data) => {
      if (err) { reject(err); }
      if (data) { 
        let record = JSON.parse(data.toString());
        resolve(record);
      } else {
        reject('Nothing Found');
      }
    });
  });
};

storage.delete = (id) => {
  return new Promise((resolve, reject) => {
    let file = `${dataDirectory}/${id}.json`;
    fs.unlink(file, (err) => {
      if (err) { reject(err); }
      else {
        resolve('Entry Was Deleted');
      }
    });
  });
};

storage.save = (record) => {
  return new Promise((resolve, reject) => {
    let file = `${dataDirectory}/${record.id}.json`;
    let text = JSON.stringify(record);
    fs.writeFile(file, text, (err) => {
      if (err) { reject(err); }
      else { resolve(record); }
    });
  });
};