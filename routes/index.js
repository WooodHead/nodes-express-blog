var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/blogdb');

db.serialize(function() {
    db.run('CREATE TABLE IF NOT EXISTS "blog" ('+
	'`id`	INTEGER PRIMARY KEY AUTOINCREMENT,'+
	'`title`	text,'+
	'`text`	text,'+
	'`type` text)');
    db.run("INSERT INTO blog (title, text, type) VALUES (?, ?, ?)", "Home Page", "Welcome to my blog, please feel free to browse the site!", "page");
     db.run("INSERT INTO blog (title, text, type) VALUES (?, ?, ?)", "Hello World", "Hiii", "page");
});

/* GET home page. */
router.get('/', function(req, res, next) {
   
    db.all("SELECT * FROM blog;", function(err2, result){
    console.log(result);
   
   
   res.render('index', { title: 'Hello', body: 'hello wold', blogs: result });
   });
});

router.get('/id/:id', function(req, res, next) {
   res.render('about', { title: 'View Blog', id: req.param('id')});

});

router.post('/', function(req, res, next) {
 db.run("UPDATE blog SET title = '"+req.body.title+"', text = '"+req.body.text+"' WHERE id = 1;", function(err, row){
        if (err){
            res.status(500);
            res.render('index', { title: err });
        }
        else {
            res.status(202);
            res.render('index', { title: req.body.id, body: req.body.text});
        }
        res.end();
    });
});

module.exports = router;

