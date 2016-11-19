var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/resume");

autoIncrement.initialize(connection);

var Rating = new Schema({
    rname: String,
	rdescription: String,
	rtype: String
});

Rating.plugin(passportLocalMongoose);
Rating.plugin(autoIncrement.plugin, { model: 'Rating', field: 'ratingId' });
module.exports = mongoose.model('Rating', Rating);