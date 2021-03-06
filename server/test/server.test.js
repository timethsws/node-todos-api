const expect = require('expect')
const request = require('supertest')
const { ObjectID } = require('mongodb')

const { app } = require('./../server')
const { Todo } = require('./../models/todo')
const { User } = require('./../models/user')
const { todos , populateTodos, users, populateUsers } = require ('./seed/seed')

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
    it('Should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({
                text
            })
            .set('x-auth',users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe;
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch(((e) => done(e)));
            });
    });


    it('Should not create todo', (done) => {
        var text = 'Test todo text';
        request(app)
            .post('/todos')
            .send({
                //text
            })
            .set('x-auth',users[0].tokens[0].token)
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e))
            });
    });
});

describe('GET /todos', () => {
    it('Should get all todos', (done) => {
        request(app)
            .get('/todos')
            .set('x-auth',users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(1);
            })
            .end(done);
    })
})

describe('GET /todos/:id', () => {

    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .set('x-auth',users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done)
    })

    it('Should return 404 if the todo is not found', (done) => {
        var id = new ObjectID();
        request(app)
            .get(`/todos/${id.toHexString()}`)
            .set('x-auth',users[0].tokens[0].token)
            .expect(404)
            .end(done)

    })

    it('Should return 400 if the id is invalid', (done) => {
        request(app)
            .get('/todos/1231asd')
            .set('x-auth',users[0].tokens[0].token)
            .expect(400)
            .end(done)
    })

    it('should not return todo doc created by other user', (done) => {
        request(app)
            .get(`/todos/${todos[1]._id.toHexString()}`)
            .set('x-auth',users[0].tokens[0].token)
            .expect(404)
            .end(done)
    })
})

describe('DELETE /todos/:id', () => {

    it('Should remove a todo', (done) => {
        request(app)
            .delete(`/todos/${todos[0]._id.toHexString()}`)
            .set('x-auth',users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text)

            })
            .end((err,res) => {
                if(err){
                    return done(err)
                }
                Todo.findById(todos[0]._id.toHexString()).then((todo) => {
                    expect(todo).toNotExist();
                    done()
                }).catch((e) => done(e))
            })
    })

    it('Should not remove a todo belonging to other user', (done) => {
        request(app)
            .delete(`/todos/${todos[1]._id.toHexString()}`)
            .set('x-auth',users[0].tokens[0].token)
            .expect(404)
            .end((err,res) => {
                if(err){
                    return done(err)
                }
                Todo.findById(todos[0]._id.toHexString()).then((todo) => {
                    expect(todo).toExist();
                    done()
                }).catch((e) => done(e))
            })
    })

    it('Should not remove a todo', (done) => {
        var id = new ObjectID()
        request(app)
            .delete(`/todos/${id.toHexString()}`)
            .set('x-auth',users[0].tokens[0].token)
            .expect(404)
            .end((err,res) => {
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done()
                }).catch((e) => done(e))
            })
    })

    it('Should return 400 if the id is invalid', (done) => {
        request(app)
            .delete('/todos/1231asd')
            .set('x-auth',users[0].tokens[0].token)
            .expect(400)
            .end(done)
    })

})

describe('PATCH /todos/:id', () => {

    it('Should update the todo completed true ', (done) => {
        
        request(app)
        .patch(`/todos/${todos[0]._id.toHexString()}`)
        .set('x-auth',users[0].tokens[0].token)
        .send({
            completed : true
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.completed).toBe(true)

        })
        .end((err,res) => {
            if(err){
                return done(err)
            }

            Todo.findById(todos[0]._id.toHexString()).then((todo) => {
                expect(todo.completed).toBe(true)
                expect(todo.completedAt).toExist();
                done()
            }).catch((e)=> done(e))
        })
        
    })

    it('Should not update a todo by another user ', (done) => {
        
        request(app)
        .patch(`/todos/${todos[0]._id.toHexString()}`)
        .set('x-auth',users[1].tokens[0].token)
        .send({
            completed : true
        })
        .expect(404)
        .end((err,res) => {
            if(err){
                return done(err)
            }

            Todo.findById(todos[0]._id.toHexString()).then((todo) => {
                expect(todo.completed).toBe(false)
                expect(todo.completedAt).toNotExist();
                done()
            }).catch((e)=> done(e))
        })
        
    })

    it('Should update the todo completed false text to new_text', (done) => {
        var new_text = "This is the new text to put"
        request(app)
        .patch(`/todos/${todos[1]._id.toHexString()}`)
        .set('x-auth',users[1].tokens[0].token)
        .send({
            completed : false,
            text : new_text
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.completed).toBe(false)
            expect(res.body.todo.text).toBe(new_text)

        })
        .end((err,res) => {
            if(err){
                return done(err)
            }

            Todo.findById(todos[1]._id.toHexString()).then((todo) => {
                expect(todo.completed).toBe(false)
                expect(todo.completedAt).toNotExist();
                expect(todo.text).toBe(new_text);
                done()
            }).catch((e)=> done(e))
        })
    })


})

describe('GET /users/me',() =>{
    it('Should return user if authenticated',(done) => {
        request(app)
            .get('/users/me')
            .set('x-auth',users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe (users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done); 
    })

    it('Should return 401 if not authenticated', (done) => {
        //done();
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({})
            })
            .end(done)
    })
})

describe('POST /users',() =>{

    it('Should create a user',(done) => {
        var email = 'example@this.com'
        var password = 'password123'

        request(app)
            .post('/users')
            .send({email,password})
            .expect(200)
            .expect((res)=> {
                expect(res.headers['x-auth']).toExist();
                expect(res.body._id).toExist();
                expect(res.body.email).toBe(email);
            }).end((err) => {
                if(err){
                    return done(err)
                }

                User.findOne({email}).then((user) => {
                    expect(user).toExist();
                    expect(user.email).toBe(email);
                    done();
                })
            })
    })

    it('Should return validation errors if request is invalid', (done) => {
        // done()
        var email = 'invalidEmail'
        var password ='pass'
        request(app)
            .post('/users')
            .send({email,password})
            .expect(400)
            .end(done)
    })

    it('Should not create user if email in use', (done) => {
        // done()
        

        request(app)
            .post('/users')
            .send({email : users[0].email, password : 'password1'})
            .expect(400)
            .end(done)
    })
})

describe('GET /users/login',() =>{

    it('Should login user and return auth token',(done) => {
        request(app)
            .post('/users/login')
            .send({
                email : users[1].email,
                password : users[1].password
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist()
                expect(res.body.email).toBe(users[1].email)
                expect(res.body._id).toBe(users[1]._id.toHexString())
            })
            .end((err,res) => {
                if (err) {
                    return done(err)
                }
                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens[1]).toInclude({
                        access : 'auth',
                        token : res.headers['x-auth']
                    });
                    done();
                }).catch((e) => done(e));
            });
    });

    it('Should reject invalid login', (done) => {
        request(app)
        .post('/users/login')
        .send({
            email : users[1].email,
            password : 'notHisPassword'
        })
        .expect(400)
        .expect((res) => {
            expect(res.headers['x-auth']).toNotExist()
            expect(res.body).toEqual({})
        })
        .end(done)
    })
})

describe('DELETE /users/me/token',() =>{

    it('Should remove auth token on logout',(done) => {
        // done()
        request(app)
            .delete('/users/me/token')
            .set('x-auth',users[0].tokens[0].token)
            .expect(200)
            .end((err,res) => {
                if(err){
                    return done(err)
                }
                User.findById(users[0]._id).then((user)=>{
                    expect(user.tokens.length).toBe(0)
                    done()
                }).catch((e) => done(e))
            })
    });

})