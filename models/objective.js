var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/resume");

autoIncrement.initialize(connection);

var Objective = new Schema({
	username: String,
	oaccountId: Number
});

Objective.plugin(passportLocalMongoose);
Objective.plugin(autoIncrement.plugin, { model: 'Objective', field: 'objectiveId' });
module.exports = mongoose.model('Objective', Objective);