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
var methodOverride = require('method-override');
app.use(flash());
app.use(methodOverride('_method'));
var PDFDocument = require ('pdfkit');
doc = new PDFDocument;

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('objectives');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var oaccountId = req.body.oaccountId;

    // Set our collection
    var collection = db.get('objectives');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "oaccountId" : oaccountId
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/', function (req, res) {
	res.render('index', {
		user: req.user
	});
});

router.get('/profile', function (req, res) {
	res.render('profile', {
		user: req.user
	});
});

router.get('/register', function (req, res) {
	res.render('register', {});
});

router.get('/objective', function (req, res) {
	res.render('objective', {
		user: req.user
	});
});

router.get('/education', function (req, res) {
	res.render('education', {
		user: req.user
	});
});

router.get('/construct', function (req, res) {
	res.render('construct', {});
});

router.get('/contact', function (req, res) {
	res.render('contact', {
		user: req.user
	});
});

router.get('/try', function (req, res) {
	res.render('try', {
		user: req.user
	});
});

router.post('/try', function (req, res) {
	Account.findOneAndUpdate({ accountId: req.body.accountId }, { name: req.body.name }, function(err, user) {
	 console.log('fwf');	
  if (err) 
  { console.log(err); }
else {
  console.log(user);
  res.redirect('/profile');
}
  });
});

router.post('/objective', function (req, res) {
	new Objective({
		username: req.body.username,
		oaccountId: req.body.oaccountId
	}).save(function (err, ouser) {
		if (err) {
			console.log("ERR0R - objective!!!");
			console.log(err);
		} else {
		console.log("Objective saved");	
		res.redirect('/objective');
		}
	});
});

router.post('/contact', function (req, res) {
	new Contact({
		username: req.body.username,
		caddress: req.body.caddress,
		ccity: req.body.ccity,
		cstate: req.body.cstate,
		ccountry: req.body.ccountry,
		czip: req.body.czip,
		cemail: req.body.cemail,
		cphone: req.body.cphone,
		caccountId: req.body.caccountId
	}).save(function (err, cuser) {
		if (err) {
			console.log("ERR0R - contact!!!");
			console.log(err);
		} else
		res.redirect('/objective');
	});
});

router.get('/camera', function (req, res) {
	res.render('camera', {});
});

router.post('/register', function (req, res) {
	Account.register(new Account({
			username: req.body.username,
			name: req.body.name,
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
	res.render('login', {});
});

router.post('/login', passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}));

router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;