var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/resume");

autoIncrement.initialize(connection);

var Education = new Schema({
    eschool: String,
	ecity: String,
	estate: String,
	ecountry: String,
	estart: Date,
	eend: Date,
	eachievements: String
});

Education.plugin(passportLocalMongoose);
Education.plugin(autoIncrement.plugin, { model: 'Education', field: 'educationId' });
module.exports = mongoose.model('Education', Education);