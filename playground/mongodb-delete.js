// const MongoClient = require('mongodb').MongoClient
const {MongoClient,ObjectID} = require('mongodb')

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server')

    // // delete Many
    // db.collection('Todos').deleteMany({
    //     text : 'Eat Lunch'
    // }).then ((result) => {
    //     console.log(result)
    // })

    // // Delete One
    // db.collection('Todos').deleteOne({
    //     text: "Eat Lunch"
    // }).then((res) => {
    //     console.log(res)
    // })

    // // Find and Delete One
    // db.collection('Todos').findOneAndDelete ({
    //     completed : false
    // }).then((res) => {
    //     console.log(res);
    // })

    // -- CHALLENGE --

    //Delete the duplicates
    // db.collection('Users').deleteMany({
    //     name : "Timeth"
    // }).then ((res) => {
    //     console.log(res);
    // })

    db.collection('Users').findOneAndDelete({
        _id : new ObjectID('5b17efa68bc633195531ceac')
    }).then( (res) => {
        console.log(res);
    });

    // db.close()
});