var express = require('express')
  , router = express.Router()
  , Course = require('../models/course');

var default_courseid = "CourseID";

var default_course = {
	  courseid: "CourseID",
	  coursename: "coursename"
	};
	
router.get('/new', isLoggedIn, function(req, res) {
	res.render('courses/new', { title: 'Add New course', course: default_course});
});

router.post('/create', isLoggedIn, function(req, res) {
	var course = {
	  courseid: req.body.courseid,
	  coursename: req.body.coursename
	};
	var courseid = req.body.courseid;

	Course.getBycourseid(courseid, function(err,doc) {
	if(err)
		res.send("Some error occured");
	else if(doc)
		res.redirect('/courses/new');
		else{
		Course.create(course, function(err, doc) {
			if(err)
				res.send("Some error occured");
			else
				res.redirect('/admin/home');
		})	}
	})
});

router.get('/get_courseid_edit', isLoggedIn, function(req, res) {
	res.render('courses/get_courseid_edit', { title: "Get course ID", courseid: default_courseid});
});

router.get('/edit', isLoggedIn, function(req,res) {
	var courseid = req.query.courseid;
    Course.getBycourseid(courseid, function(err,doc) {
		if(err)
			res.send("Some error occured");
		else
		{
			if(doc)
			res.render('courses/edit', {title: 'Edit Course', course: doc});
			else
			res.render('courses/get_courseid_edit', { title: "Get course ID", courseid: default_courseid});
		}
	});
});

router.post('/update', isLoggedIn, function(req, res) {
	var course = {
	  courseid: req.body.courseid,
	  coursename: req.body.coursename
	};
	var prevcourseid = req.body.prevcourseid;
	Course.update(prevcourseid, course, function(err, doc) {
			if(err)
				res.render('courses/edit', { title: 'Edit Course', course: doc});
			else
				res.redirect('../admin/home');
		});
});

router.get('/get_courseid_delete', isLoggedIn, function(req, res) {
	var default_courseid = "User Name";
	res.render('courses/get_courseid_delete', { title: "Get course ID", courseid: default_courseid});
});


router.post('/delete', isLoggedIn, function(req, res) {
	var courseid = req.body.courseid;
	Course.getBycourseid(courseid, function(err,doc) {
	if(err)
		res.send("Some error occured");
	else if(doc)
	{
	Course.remove(courseid, function(err, doc) {
		if(err)
			res.send("Some error occured");
		else
			res.redirect('../admin/home');
	})}
	else
		res.render('courses/get_courseid_delete', { title: "Get course ID", courseid: default_courseid});	
	})
});

module.exports = router;

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()&&req.user.usertype=='admin')
        {return next();}

    // if they aren't redirect them to the home page
    res.redirect('/');
}