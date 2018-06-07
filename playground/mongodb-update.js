// const MongoClient = require('mongodb').MongoClient
const {MongoClient,ObjectID} = require('mongodb')

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server')

    // db.collection('Todos').findOneAndUpdate({
    //     _id :new ObjectID('5b18713d5a2f15ed9788341a')
    // },{
    //     $set : {
    //         completed : true
    //     }
    // },{
    //     returnOriginal :false
    // }).then((res) => {
    //     console.log(res);
    // })

    db.collection('Users').findOneAndUpdate({
        _id : new ObjectID('5b17edc0f848aa193c586f6e')
    },{
        $inc :{
            age : 1
        },
        $set : {
            name : "Mike"
        }

    },{
        returnOriginal : false
    }).then((res) =>{
        console.log(res)
    })

    // db.close()
});