var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/examdb');
var student_collection = db.get('students');

module.exports = {
// MAKE VALIDATION FUNCTIONS HERE
// Create new student in the database
create: function(student, cb) {
  student_collection.insert(student, cb);
},

findByUserName: function(username, cb) {
  student_collection.findOne({username: username}, {}, cb);
},

// Retrieve student using username
getByUserName: function(username, cb) {
  student_collection.findOne({username: username}, {}, cb);
},

// Update an existing student by username
update: function(prevusername, student, cb) {
  student_collection.update({username: prevusername},
  { $set: {username: student.username, password: student.password,
  name: student.name, rollno: student.rollno} },
  cb);
},

// Remove an existing student by username
remove: function(username, cb) {
  student_collection.remove({username: username}, cb);
},

// Register student to a course by username and course ID
register: function(username, course_code, cb) {
student_collection.update(
   { username: username },
   { $addToSet: { course_list: { $each: [ course_code] } } }, cb);
},

deregister: function(username, course_code, cb) 
{
student_collection.update(
	{username: username},
	{ $pull: {  course_list: course_code } },cb);
},

getBycourseid: function(username,course_code, cb) {
  student_collection.findOne({username: username, course_list :course_code}, {}, cb);
}

};







