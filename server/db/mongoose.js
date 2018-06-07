var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var url = process.env.AtlasURL;
mongoose.connect(url);

module.exports = {mongoose};