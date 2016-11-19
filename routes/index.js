var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Contact = require('../models/contact');
var Work = require('../models/work');
var Education = require('../models/education');
var Skill = require('../models/skill');
var Objective = require('../models/objective');
var Rating = require('../models/rating');
var Project = require('../models/project');
var Link = require('../models/link');
var Template = require('../models/template');
var Image = require('../models/image');
var router = express.Router();
var flash = require('connect-flash');
var app = express();
app.use(flash());

router.get('/', function (req, res) {
	res.render('index', {
		user: req.user
	});
});

router.get('/register', function (req, res) {
	res.render('register', {});
});

router.get('/construct', function (req, res) {
	res.render('construct', {
		user: req.user
	});
});

router.post('/construct', function (req, res) {
	Contact.register(new Contact({
			cname: req.body.cname,
			caddress: req.body.caddress,
			ccity: req.body.ccity,
			cstate: req.body.cstate,
			ccountry: req.body.ccountry,
			czip: req.body.czip,
			cemail: req.body.cemail,
			cphone: req.body.cphone,
			caccountId: req.body.caccountId
		}), function (err, cuser) {
		if (err) {
			console.log("ERR0R - contact!!!");
			return res.render('construct', {
				cuser: cuser
			});
		}
		
		passport.authenticate('local')(req, res, function () {
			res.redirect('/');
		});
	});
});

router.get('/camera', function (req, res) {
	res.render('camera', {});
});

router.post('/register', function (req, res) {
	Account.register(new Account({
			username: req.body.username,
			email: req.body.email,
			gender: req.body.gender,
			birthday: req.body.birthday
		}), req.body.password, function (err, user) {
		if (err) {
			console.log("ERR0R - register!!!");
			return res.render('register', {
				user: user
			});
		}

		passport.authenticate('local')(req, res, function () {
			res.redirect('/');
		});
	});
});

router.get('/login', function (req, res) {
	res.render('login', {
		user: req.user
	});
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});


/*, {
		successRedirect: '/construct',
		failureRedirect: '/login',
		failureFlash: true
	}));*/

router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;