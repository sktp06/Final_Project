const express = require('express');
const app = express();


app.use(express.static('public'));


//call ejs template
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/login.html', function(req, res) {
    res.sendFile(__dirname + '/login.html');
});

app.get('/table.html', function(req, res) {
    res.sendFile(__dirname + '/table.html');
});

app.get('/categories.html', function(req, res) {
    res.sendFile(__dirname + '/categories.html');
});

app.get('/sign_up.html', function(req, res) {
    res.sendFile(__dirname + '/sign_up.html');
});

app.get('/menu.html', function(req, res) {
    res.sendFile(__dirname + '/menu.html');
});

//running on port 3000
app.listen(3000);
console.log('Server is listening on port 3000');