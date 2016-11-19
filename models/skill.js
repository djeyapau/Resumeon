var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/resume");

autoIncrement.initialize(connection);

var Skill = new Schema({
    stype: String,
	sname: String
});

Skill.plugin(passportLocalMongoose);
Skill.plugin(autoIncrement.plugin, { model: 'Skill', field: 'skillId' });
module.exports = mongoose.model('Skill', Skill);