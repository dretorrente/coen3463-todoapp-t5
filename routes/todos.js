var express = require('express');
var router = express.Router();
var Todo = require('../models/todos');
var Validator = require( 'validator');
var validateTodoForm = require('../src/containers/validations/todo');
var _  = require('lodash');
var ObjectId = require('mongodb').ObjectId;
let Moment = require('moment-timezone');
var datetime = require('node-datetime');





router.get('/events/:id',(req, res, next) => {
    // console.log(req.user);
    // res.status(201).json({result: "RESULT", user: req.user});
    let id = req.params.id;
    console.log(id);
    Todo.find(function(err, docs) {

        let filterTodos = [];
        //     // let newTaskOutput = [];
        for (let i=0; i < docs.length ; ++i){
            // output.push(arrayData[i]["user"]);
            if(docs[i].owner == id) {
                filterTodos.push(docs[i])
            }

        }
        console.log(filterTodos);
        res.send({todos: filterTodos});
    });

});


router.post('/events',(req, res, next) => {
    dt = datetime.create();
    var formatted = dt.format('m/d/Y');

    let dateTodo = Moment().tz('Singapore').format().replace(/T/, ' ').replace(/\+/g, ' ');
    let dateStatus = Moment().tz('Singapore').format('ha z').slice(1,4);
    let dateSlice = formatted + ' ' + dateTodo.slice(11,18) + dateStatus;
    const { errors, isValid} = validateTodoForm(req.body);

    if(isValid) {
        console.log(req.user);
        var todos = new Todo({
            name: req.body.todotask,
            owner:req.user,
            createdDate: dateSlice
        });
        todos.save(function(err, result) {
            console.log(result);
            res.status(201).json({ success: true, result:result });
        });
    }
    else {
        return res.status(400).json({
            success: false,
            errors: errors
        });
    }

});


router.delete('/events/:id',(req, res, next) => {
    var todoID = req.params.id;
    // var singleTodo = Todo.find();

    Todo.findOneAndRemove({ _id:ObjectId(todoID) }, function(err, entry) {
      if(err) {res.status(500).json({errors: {global:err}}); return;}

      res.json({});
    })

});

router.delete('/events/allCompleted/:id',(req, res, next) => {
    let id = req.params.id;
    console.log(id);
    Todo.find(function(err, docs) {
        for (let i=0; i < docs.length ; ++i) {
            // output.push(arrayData[i]["user"]);
            if (docs[i].owner == id) {
                if (docs[i].isCompleted) {
                    docs[i].remove(err=> {
                        if (err) {
                            return res.json({
                                success: false,
                                response: 'Error occured'
                            });
                        }

                    })

                }

            }
        }

    });

    res.send({success: true});
});

router.delete('/events/all/:id',(req, res, next) => {
    let id = req.params.id;
    console.log(id);
    Todo.find(function(err, docs) {
        for (let i=0; i < docs.length ; ++i) {
            // output.push(arrayData[i]["user"]);
            if (docs[i].owner == id) {
                    docs[i].remove(err=> {
                        if (err) {
                            return res.json({
                                success: false,
                                response: 'Error occured'
                            });
                        }

                    })



            }
        }

    });

    res.send({success: true});
});


router.put('/events/:id', function(req,res, next) {
    dt = datetime.create();
    var formatted = dt.format('m/d/Y');

    let dateTodo = Moment().tz('Singapore').format().replace(/T/, ' ').replace(/\+/g, ' ');
    let dateStatus = Moment().tz('Singapore').format('ha z').slice(1,4);
    let dateSlice = formatted + ' ' + dateTodo.slice(11,18) + dateStatus;
    var todoID = req.params.id;
    // var singleTodo = Todo.find();

    Todo.findOneAndUpdate({ _id: new ObjectId(todoID)}, {$set:{isCompleted:true, createdDate: dateSlice}},function(err, docs){
        if (err) { res.status(500).json({ errors: { global: err }}); return; }
        res.send({todo:docs});
        console.log(docs)
    });


});


module.exports = router;