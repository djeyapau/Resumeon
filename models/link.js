var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Link = new Schema({
    laccId: Number,
	lidentify: Number,
	lname: String
});

Link.plugin(passportLocalMongoose);
module.exports = mongoose.model('Link', Link);