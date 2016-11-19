var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/resume");

autoIncrement.initialize(connection);

var Template = new Schema({
    tname: String,
	taccountId: Number,
});

Template.plugin(passportLocalMongoose);
Template.plugin(autoIncrement.plugin, { model: 'Template', field: 'templateId' });
module.exports = mongoose.model('Template', Template);