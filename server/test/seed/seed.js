const {ObjectID} = require('mongodb')
const jwt = require('jsonwebtoken')

const {Todo} = require('./../../models/todo')
const {User} = require('./../../models/user')

var userOneId = new ObjectID();
var userTwoId = new ObjectID();

const users = [
    {
        _id : userOneId,
        email: 'user1@example.com',
        password: 'password123',
        tokens :[{
            access : 'auth',
            token: jwt.sign({_id : userOneId, acess : 'auth'},'abc123').toString()

        }]
    },{

        _id : userTwoId,
        email: 'user2@example.com',
        password: 'password123',
    }
]

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User (users[0]).save()
        var userTwo = new User (users[1]).save()

        return Promise.all([userOne,userTwo])
    }).then (()=>done())
}

const todos = [{
    _id: new ObjectID(),
    text: "First test"
    }, {
    _id: new ObjectID(),
    text: "Second test",
    completed : true,
    completedAt : new Date().getTime()
}]

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};


module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
}
