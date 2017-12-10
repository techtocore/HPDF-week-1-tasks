const express = require('express')
var cookieParser = require('cookie-parser');
var app = express()
var request = require("request")
app.use(cookieParser());
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


// TASK 1
app.get('/', (req, res) => res.send('Hello World! - Akash Ravi'))

//TASK 2
var names = [];
var id = [];
var count = [];

var url1 = "https://jsonplaceholder.typicode.com/users"

request({
    url: url1,
    json: true
}, function (error, response, users) {

    if (!error && response.statusCode === 200) {
        //console.log(users) // Print the json response
    }
    users.forEach(function(user) {
        var UserName = user.name;
        names.push(UserName);
        var UserId = user.id;
        id.push(UserId);
        count.push(0);
    });
   
})

var url2 = "https://jsonplaceholder.typicode.com/posts"

request({
    url: url2,
    json: true
}, function (error, response, posts) {

    if (!error && response.statusCode === 200) {
        //console.log(posts) // Print the json response

    }

    posts.forEach(function(post){
        var Postid = post.userId;
        for(var i = 0; i < id.length; i++)
        {
            if(id[i]==Postid)
            {
                count[i]++;
            }
        }
    });
    
})



app.get('/authors', function(req, res){
    res.write("List of authors and the count of their posts:\n\n");
    for(var i=0;i<names.length;i++)
    {
        res.write( names[i] +  ", " + count[i] + "\n");
    }
    res.end();
});

app.listen(3000);


//TASK 3
app.get('/setcookie', function(req, res){
    res.cookie('testcookie', {
     "name": "Akash Ravi",
     "age": 19
   }).send('cookie set');
 });
 


//TASK 4
 app.get('/getcookies', function(req, res) {
     if(!req.cookies.testcookie)
     {
         res.write("\nNo cookies found! Set it first"); //exception handling
         res.end();
     }
     else{
        var getcookie = req.cookies.testcookie;   
        var a =getcookie.name;
        var b =getcookie.age;
        res.write("\nName: "+ a+ "\nAge: "+ b);
        res.end();
     }
   });


//TASK 5
app.get('/robots.txt', function(req, res){
    res.status(403).end('\nSorry, you are forbidden to see this page');
 });


//TASK 6
app.get('/html', function(req, res){
    res.sendFile('index.html',{"root": __dirname});
 });


//TASK 7
app.get('/input', function(req, res){
     res.sendFile('/input.html',{"root": __dirname});
  });
 
  app.post('/ip', function(req, res) {
     var a = req.body.ip;
     console.log("Entered text: " + a);
     res.send("\nResponse recorded");
 });
 




app.listen(8080, () => console.log('App listening on port 8080!'))