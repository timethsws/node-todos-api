var express = require('express');
var bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')


var { mongoose } = require('./db/mongoose')
var { Todo } = require('./models/todo')
var { User } = require('./models/user')

var app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.json());

app.post('/todos', (req, res) => {

    //console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc)
    }, (e) => {
        res.status(400).send(e)
    })

})

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos })
    }, (e) => {
        res.status(400).send(e);
    })
})

app.get('/todos/:id', (req, res) => {
    var id = req.params.id

    Todo.findById(id)
        .then((todo) => {
            if(!todo){
                return res.status(404).send({})
            }
            res.send({ todo });
        }).catch((e) => {
            res.status(400).send({});
        })


})


module.exports = {
    app
}

app.listen(port, () => {
    console.log(`Started on port ${port}`)
})