var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://admin_2:todo_app_admin@todoapp-jujgw.mongodb.net/test?retryWrites=true');

module.exports = {mongoose};