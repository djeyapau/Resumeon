var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/resume");

autoIncrement.initialize(connection);

var Contact = new Schema({
	username: String,
	czip: Number,
	ccity: String,
	cstate: String,
	caddress: String,
	cphone: Number,
	cemail: String,
	ccountry: String,
	caccountId: Number
});

Contact.plugin(passportLocalMongoose);
Contact.plugin(autoIncrement.plugin, { model: 'Contact', field: 'contactId' });
module.exports = mongoose.model('Contact', Contact);