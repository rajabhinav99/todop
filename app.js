const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true });

let db = mongoose.connection;
db.once('open', function () {
    console.log('Connection Open');
});

db.on('error', function (err) {
    console.log(err);
});

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

let todo = require('./model/todo');

app.get('/', function (req, res) {
    todo.find({}, function (err, tododata) {
        res.render('index', {

            title: 'This is Capgemini L&D',
            todoData: tododata,
            emg: 'L&D Department'
        });

    });
});

app.get('/home', function (req, res) {
    res.render('home', {
        mydata: 'This is Capgemini L&D'
    });
});


app.get('/add', function (req, res) {
    res.render('addtodo', {
        mydata: 'This is Capgemini L&D'
    });
});

app.post('/todo/adddata', function (req, res) {
    let to = new todo();
    to.action = req.body.action;
    to.status = req.body.status;
    to.save(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        else {
            res.redirect('/');
        }
    });
});

app.get('/searchtodo/:id', function (req, res) {
    todo.findById(req.params.id, function (err, edata) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('updatetodo', {
                data: edata
            });
        }
    });
});

app.post('/todo/updatedata/:id', function (req, res) {
    let to = {};
    to.action = req.body.action;
    to.status = req.body.status;
    let query = { _id: req.params.id };
    todo.update(query, to, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        else {
            res.redirect('/');
        }
    });
});

app.get('/deletetodo/:id', function (req, res) {
    let queryDelete = { _id: req.params.id };
    todo.remove(queryDelete, function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });

});

app.listen(3000, function () {

    console.log('SERVER is running port no 3000');
});



