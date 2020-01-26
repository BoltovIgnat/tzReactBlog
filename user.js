var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/Blog';

module.exports = {
    signup: function(name, email, password){
        MongoClient.connect(url, 
            {
                useUnifiedTopology: true,
                useNewUrlParser: true
            }, 
            function(err, client) {
                var db = client.db('Blog');
                db.collection('user').insertOne( {
                    "name": name,
                    "email": email,
                    "password": password
                },function(err, result){
                    console.log(result);
                    assert.equal(err, null);
                    
            });
        });
    },
    validateSignIn: function(username, password,callback){
        MongoClient.connect(url,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true
            },
            function(err, client){
                var db = client.db('Blog');
                db.collection('user').findOne( { email : username ,password: password 
                },function(err, result){
                    if(result==null){
                        callback(false)
                    }
                    else{
                        callback(true)
                    }
                });
        });
    },
    getUserInfo: function(username, callback){
        MongoClient.connect(url, 
            {
                useUnifiedTopology: true,
                useNewUrlParser: true
            },
            function(err, client){
                var db = client.db('Blog');
                db.collection('user').findOne( { email : username 
                },function(err, result){
                    if(result==null){
                        callback(false)
                    }
                    else{
                        callback(result);
                    }
                });
             
        });
    },
    updateProfile: function(name, password, username, callback){
        MongoClient.connect(url,{
                useUnifiedTopology: true,
                useNewUrlParser: true
            },
            function(err, client){
                var db = client.db('Blog');
                db.collection('user').updateOne( 
                    { "email": username },
                    { $set: 
                        { "name" : name,
                        "password" : password 
                        }
                    },function(err, result){
                    
                    if(err == null){
                        callback(true)
                    }
                    else{
                        callback(false)
                    }
                });
        });
    }
}