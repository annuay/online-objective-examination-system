var express = require('express')
  , passport = require('passport')
  , router = express.Router();

router.get('/', function(req, res) {
    var usertype = req.query.usertype;
    if(usertype == 'admin')
        res.render('login', {title: "Admin Login", method: "authenticate_admin"});
    if(usertype == 'student')
        res.render('login', {title: "Student Login", method: "authenticate_student"});
    if(usertype == 'faculty')
        res.render('login', {title: "Faculty Login", method: "authenticate_faculty"});
});

router.post('/authenticate_admin', passport.authenticate('local-login-admin', {
        successRedirect : '../admin/home', 
        failureRedirect : '/',
        failureFlash : true 
}));

router.post('/authenticate_student', passport.authenticate('local-login-student', {
        successRedirect : '../students/home',
        failureRedirect : '/', 
        failureFlash : true 
}));

router.post('/authenticate_faculty', passport.authenticate('local-login-faculty', {
        successRedirect : '../faculties/home', 
        failureRedirect : '/', 
        failureFlash : true 
}));


module.exports = router;