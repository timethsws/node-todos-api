// const MongoClient = require('mongodb').MongoClient
const {MongoClient,ObjectID} = require('mongodb')

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server')

    // // Get the results to an array
    //
    // db.collection('Todos').find({
    //     _id: new ObjectID('5b17e8d83c16aa191c6e9bb0')
    // }).toArray().then((docs)=>{
    //     console.log('Todos')
    //     console.log (JSON.stringify(docs,undefined,2))
    // },(err) => {
    //     console.log('Unable to fetch todos : ', err)
    // })

    // // get the number of results
    //
    // db.collection('Todos').find().count().then((count)=>{
    //     console.log('Todos Count :',count)
    //     // console.log (JSON.stringify(docs,undefined,2))
    // },(err) => {
    //     console.log('Unable to fetch todos : ', err)
    // })
 

    // db.collection('Users').find({
    //     name : "Timeth"
    // }).toArray().then((docs)=>{
    //     console.log('User Name Timeth')
    //     console.log (JSON.stringify(docs,undefined,2))
    // },(err) => {
    //     console.log('Unable to fetch todos : ', err)
    // })

    db.collection('Users').find({
        name : 'Timeth'
    }).count().then((count)=> {
        console.log(`User count : ${count}`)
    }, (err) => {
        console.log ("Error : ", err)
    })

    //db.close()
});