const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} =require('./../server/models/user')

var id = '5b18b10187b1f41fc855493411'

// Todo.find({
//     _id:id
// }).then((todos) => {
//     console.log('Todos',todos);
// })

// Todo.findOne({
//     _id:id
// }).then((todo) => {
//     console.log('Todos',todo);
// })


// if (!ObjectID.isValid(id)){
//     console.log('ID is not valid')
// }
// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo By Id')
// }).catch((e) => console.log(e))

User.findById(id).then ((user) => {
    if(!user){
        return console.log('User with the given id does\'t exist' )
    }

    console.log(JSON.stringify(user , undefined, 2))
}).catch((e) => {
    console.log("Error : ",e.message)
})
