var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//To user with heroku and mongodb atlas
//mongoose.connect('mongodb+srv://admin_2:todo_app_admin@todoapp-jujgw.mongodb.net/test?retryWrites=true');

mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};