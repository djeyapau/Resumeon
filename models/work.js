var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/resume");

autoIncrement.initialize(connection);

var Work = new Schema({
    wempname: String,
	wcity: String,
	wcountry: String,
	wstate: String,
	wproject: String,
	wposition: String,
	wstart: Date,
	wend: Date,
	wresponsibility: String,
	wtype: String
});

Work.plugin(passportLocalMongoose);
Work.plugin(autoIncrement.plugin, { model: 'Work', field: 'workId' });
module.exports = mongoose.model('Work', Work);