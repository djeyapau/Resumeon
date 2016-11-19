var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/resume");

autoIncrement.initialize(connection);

var Image = new Schema({
    iname: String,
	iaccountId: Number
});

Image.plugin(passportLocalMongoose);
Image.plugin(autoIncrement.plugin, { model: 'Image', field: 'imageId' });
module.exports = mongoose.model('Image', Image);