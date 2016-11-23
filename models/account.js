var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/resume");

autoIncrement.initialize(connection);

var Account = new Schema({
    username: String,
    password: String,
	name: String,
	gender: String,
	birthday: Date
});

Account.plugin(passportLocalMongoose);
Account.plugin(autoIncrement.plugin, { model: 'Account', field: 'accountId' });
module.exports = mongoose.model('Accounts', Account);