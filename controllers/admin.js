var express = require('express')
  , router = express.Router()
  , Admin = require('../models/admin');

router.get('/home', isLoggedIn, function(req, res) {
	res.render('admin/home', { title: 'Options'});
});

router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
});

module.exports = router;

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()&&req.user.usertype=='admin')
        {return next();}

    // if they aren't redirect them to the home page
    res.redirect('/');
}