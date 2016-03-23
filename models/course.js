var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/examdb');
var course_collection = db.get('courses');

module.exports = {
// MAKE VALIDATION FUNCTIONS HERE
// Create new course in the database
create: function(course, cb) {
  course_collection.insert(course, cb);
},

// Retrieve course using courseid
getBycourseid: function(courseid, cb) {
  course_collection.findOne({courseid: courseid}, {}, cb);
},

// Update an existing course by courseid
update: function(prevcourseid, course, cb) {
  course_collection.update({courseid: prevcourseid},
  { $set: {courseid: course.courseid, coursename: course.coursename} },
  cb);
},

// Remove an existing course by courseid
remove: function(courseid, cb) {
  console.log(courseid);
  course_collection.remove({courseid: courseid}, cb);
}

};







