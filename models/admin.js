var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/examdb');
var admin_collection = db.get('admin');

module.exports = {
    
findByUserName: function(username, cb) {
  admin_collection.findOne({username: username}, cb);
},

};







