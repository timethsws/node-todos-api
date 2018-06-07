const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} =require('./../server/models/user')

// Todo.remove({}).then((result)=> {
//     console.log(result)
// });

var id ="5b18f4275a2f15ed978847a3"
Todo.findByIdAndRemove(id).then((todo) => {
    console.log(todo)
})