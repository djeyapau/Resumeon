var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/resume");

autoIncrement.initialize(connection);

var Project = new Schema({
    pname: String,
	pdescription: String,
	ptype: String
});

Project.plugin(passportLocalMongoose);
Project.plugin(autoIncrement.plugin, { model: 'Project', field: 'projectId' });
module.exports = mongoose.model('Project', Project);