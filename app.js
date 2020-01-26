var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var user = require('./user');
var post = require('./post');
var session = require('express-session');
var sessions;

var app = express();
app.use(express.static(path.join(__dirname,"/html")));
app.use(bodyParser.json());
app.use(session({secret: 'ibc'}));

app.listen(7777,function(){
    console.log("Started listening on port", 7777);
})

app.get('/home', function (req, res) {
    if(sessions && sessions.username){
        res.sendFile(__dirname + '/html/home.html');
    }
    else{
        res.send('unauthorized');
    }
})

app.post('/signin', function (req, res) {
    sessions=req.session;
    var user_name=req.body.email;
    var password=req.body.password;
    user.validateSignIn(user_name,password,function(result){
        sessions.username = user_name;

        if(result){
            res.send('Збс')
        }
        else{
            res.send('Неверный логин или пароль')
        }

    });
})

app.post('/signup', function (req, res) {
    var name=req.body.name;
    var email=req.body.email;
    var password=req.body.password;
    
    if(name && email && password){
        user.signup(name, email, password);
    }
    else{
        res.send('Failure');
    }
})

app.post('/addpost', function (req, res) {
    var title = req.body.title;
    var subject = req.body.subject;
    var id = req.body.id;
    if(id == '' || id == undefined){
      
      post.addPost(title, subject ,function(result){
        res.send(result);
      }); 
    }
    else{
      
      post.updatePost(id, title, subject ,function(result){
        res.send(result);
      }); 
    }
    
  })

app.post('/getpost', function (req, res) {
    post.getPost(function(result){
      res.send(result);
    });
  })

app.post('/getPostWithId', function(req,res){
    var id = req.body.id;
    post.getPostWithId(id, function(result){
      res.send(result)
    })
  })

app.post('/deletePost', function(req,res){
    var id = req.body.id;
    post.deletePost(id, function(result){
      res.send(result)
    })
  })

app.post('/getProfile', function(req,res){
    user.getUserInfo(sessions.username, function(result){
      res.send(result)
    })
  })

app.post('/updateProfile', function(req, res){
    var name = req.body.name;
    var password = req.body.password;
     
    user.updateProfile(name, password, sessions.username, function(result){
        res.send(result);
    })
  })
