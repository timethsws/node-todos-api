var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var url = process.env.AtlasURL || 'mongodb://localhost:27017/TodoApp'
mongoose.connect(url);

module.exports = {mongoose};